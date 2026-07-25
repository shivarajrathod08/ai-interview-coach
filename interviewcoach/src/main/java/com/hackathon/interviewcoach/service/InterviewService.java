package com.hackathon.interviewcoach.service;

import com.hackathon.interviewcoach.dto.request.CreateInterviewRequest;
import com.hackathon.interviewcoach.dto.request.SubmitAnswerRequest;
import com.hackathon.interviewcoach.dto.response.AnswerEvaluationResponse;
import com.hackathon.interviewcoach.dto.response.InterviewSessionResponse;
import com.hackathon.interviewcoach.dto.response.InterviewSummaryResponse;
import com.hackathon.interviewcoach.dto.response.QuestionResponse;
import com.hackathon.interviewcoach.entity.Answer;
import com.hackathon.interviewcoach.entity.InterviewSession;
import com.hackathon.interviewcoach.entity.Question;
import com.hackathon.interviewcoach.entity.User;
import com.hackathon.interviewcoach.exception.BadRequestException;
import com.hackathon.interviewcoach.exception.ResourceNotFoundException;
import com.hackathon.interviewcoach.repository.AnswerRepository;
import com.hackathon.interviewcoach.repository.InterviewSessionRepository;
import com.hackathon.interviewcoach.repository.QuestionRepository;
import com.hackathon.interviewcoach.repository.UserRepository;
import com.hackathon.interviewcoach.util.PromptBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private static final String DEFAULT_DIFFICULTY = "EASY";

    private final InterviewSessionRepository sessionRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    private final GeminiService geminiService;

    @Transactional
    public InterviewSessionResponse createInterview(CreateInterviewRequest request) {
        User user = getCurrentUser();

        InterviewSession session = InterviewSession.builder()
                .user(user)
                .jobRole(request.getJobRole())
                .experienceLevel(request.getExperienceLevel())
                .interviewType(request.getInterviewType())
                .totalQuestions(request.getNumberOfQuestions())
                .currentQuestionIndex(0)
                .status(InterviewSession.SessionStatus.IN_PROGRESS)
                .build();

        InterviewSession savedSession = sessionRepository.save(session);

        String prompt = PromptBuilder.buildQuestionGenerationPrompt(
                request.getJobRole(), request.getExperienceLevel(), request.getInterviewType(),
                request.getNumberOfQuestions(), DEFAULT_DIFFICULTY);

        List<String> generatedQuestions = geminiService.generateQuestions(prompt, request.getNumberOfQuestions());

        int order = 1;
        for (String questionText : generatedQuestions) {
            Question question = Question.builder()
                    .session(savedSession)
                    .questionText(questionText)
                    .difficulty(DEFAULT_DIFFICULTY)
                    .questionOrder(order++)
                    .build();
            questionRepository.save(question);
        }

        return toSessionResponse(savedSession);
    }

    @Transactional(readOnly = true)
    public List<InterviewSessionResponse> getUserInterviews() {
        User user = getCurrentUser();
        return sessionRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(this::toSessionResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InterviewSessionResponse getInterviewById(Long sessionId) {
        InterviewSession session = getOwnedSession(sessionId);
        return toSessionResponse(session);
    }

    @Transactional
    public AnswerEvaluationResponse submitAnswer(Long sessionId, SubmitAnswerRequest request) {
        InterviewSession session = getOwnedSession(sessionId);

        if (session.getStatus() == InterviewSession.SessionStatus.COMPLETED) {
            throw new BadRequestException("This interview session is already completed");
        }

        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new ResourceNotFoundException("Question", "id", request.getQuestionId()));

        if (!question.getSession().getId().equals(session.getId())) {
            throw new BadRequestException("This question does not belong to the given interview session");
        }

        if (answerRepository.findByQuestion(question).isPresent()) {
            throw new BadRequestException("This question has already been answered");
        }

        String prompt = PromptBuilder.buildEvaluationPrompt(
                session.getJobRole(), question.getQuestionText(), request.getAnswerText());
        GeminiService.EvaluationResult evaluation = geminiService.evaluateAnswer(prompt);

        Answer answer = Answer.builder()
                .question(question)
                .answerText(request.getAnswerText())
                .score(evaluation.score())
                .strengths(evaluation.strengths())
                .weaknesses(evaluation.weaknesses())
                .topicsToRevise(evaluation.topicsToRevise())
                .aiFeedback(evaluation.feedback())
                .build();

        Answer savedAnswer = answerRepository.save(answer);

        int nextIndex = session.getCurrentQuestionIndex() + 1;
        session.setCurrentQuestionIndex(nextIndex);

        QuestionResponse nextQuestionResponse = null;
        boolean sessionCompleted = nextIndex >= session.getTotalQuestions();

        if (sessionCompleted) {
            session.setStatus(InterviewSession.SessionStatus.COMPLETED);
            session.setOverallScore(calculateOverallScore(session));
        } else {
            String nextDifficulty = PromptBuilder.nextDifficulty(question.getDifficulty(), evaluation.score());
            Question nextQuestion = questionRepository.findBySessionAndQuestionOrder(session, nextIndex + 1)
                    .orElse(null);

            if (nextQuestion != null && !nextQuestion.getDifficulty().equals(nextDifficulty)) {
                nextQuestion.setDifficulty(nextDifficulty);
                questionRepository.save(nextQuestion);
            }

            if (nextQuestion != null) {
                nextQuestionResponse = toQuestionResponse(nextQuestion);
            }
        }

        sessionRepository.save(session);

        return AnswerEvaluationResponse.builder()
                .answerId(savedAnswer.getId())
                .questionId(question.getId())
                .score(evaluation.score())
                .strengths(evaluation.strengths())
                .weaknesses(evaluation.weaknesses())
                .topicsToRevise(evaluation.topicsToRevise())
                .aiFeedback(evaluation.feedback())
                .nextQuestion(nextQuestionResponse)
                .sessionCompleted(sessionCompleted)
                .build();
    }

    @Transactional(readOnly = true)
    public InterviewSummaryResponse getSummary(Long sessionId) {
        InterviewSession session = getOwnedSession(sessionId);
        List<Answer> answers = answerRepository.findBySessionOrderByQuestionOrder(session);

        List<InterviewSummaryResponse.AnswerDetail> details = answers.stream()
                .map(answer -> InterviewSummaryResponse.AnswerDetail.builder()
                        .questionId(answer.getQuestion().getId())
                        .questionText(answer.getQuestion().getQuestionText())
                        .answerText(answer.getAnswerText())
                        .score(answer.getScore())
                        .strengths(answer.getStrengths())
                        .weaknesses(answer.getWeaknesses())
                        .topicsToRevise(answer.getTopicsToRevise())
                        .build())
                .collect(Collectors.toList());

        return InterviewSummaryResponse.builder()
                .sessionId(session.getId())
                .jobRole(session.getJobRole())
                .overallScore(session.getOverallScore())
                .status(session.getStatus().name())
                .answers(details)
                .build();
    }

    private double calculateOverallScore(InterviewSession session) {
        List<Answer> answers = answerRepository.findBySessionOrderByQuestionOrder(session);
        return answers.stream()
                .mapToDouble(Answer::getScore)
                .average()
                .orElse(0.0);
    }

    private InterviewSession getOwnedSession(Long sessionId) {
        User user = getCurrentUser();
        return sessionRepository.findByIdAndUser(sessionId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Interview session", "id", sessionId));
    }

    private InterviewSessionResponse toSessionResponse(InterviewSession session) {
        List<Question> questions = questionRepository.findBySessionOrderByQuestionOrderAsc(session);
        List<QuestionResponse> questionResponses = questions.stream()
                .map(this::toQuestionResponse)
                .collect(Collectors.toList());

        return InterviewSessionResponse.builder()
                .id(session.getId())
                .jobRole(session.getJobRole())
                .experienceLevel(session.getExperienceLevel())
                .interviewType(session.getInterviewType())
                .totalQuestions(session.getTotalQuestions())
                .currentQuestionIndex(session.getCurrentQuestionIndex())
                .status(session.getStatus().name())
                .overallScore(session.getOverallScore())
                .createdAt(session.getCreatedAt())
                .questions(questionResponses)
                .build();
    }

    private QuestionResponse toQuestionResponse(Question question) {
        return QuestionResponse.builder()
                .id(question.getId())
                .questionText(question.getQuestionText())
                .difficulty(question.getDifficulty())
                .questionOrder(question.getQuestionOrder())
                .build();
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }
}
