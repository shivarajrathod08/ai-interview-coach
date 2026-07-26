import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useInterview } from "../../hooks/useInterview";
import { useToast } from "../../hooks/useToast";
import * as interviewApi from "../../api/interviewApi";
import { PageContainer, BreadcrumbBar } from "../../components/layout";
import {
  QuestionCard,
  AnswerInput,
  InterviewProgressBar,
  InterviewTimer,
} from "../../components/interview";
import { Skeleton, EmptyState, Button } from "../../components/common";
import { ROUTES, buildInterviewSummaryRoute } from "../../constants/routes";
import { MESSAGES } from "../../constants/messages";
import { parseApiError } from "../../utils/errorHandler";

const InterviewSessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: interview,
    loading,
    error,
    refetch,
  } = useFetch(() => interviewApi.getInterviewById(id), [id]);

  const {
    currentIndex,
    answers,
    startedAt,
    setAnswerForQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
  } = useInterview();

  if (loading) {
    return (
      <PageContainer title="Interview Session">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-48" />
        </div>
      </PageContainer>
    );
  }

  if (error || !interview) {
    return (
      <PageContainer title="Interview Session">
        <EmptyState
          title="We couldn't load this interview"
          description={error?.message}
          action={<Button onClick={refetch}>Try Again</Button>}
        />
      </PageContainer>
    );
  }

  const questions = interview.questions || [];
  const totalQuestions = interview.totalQuestions || questions.length;

  const currentQuestion = questions[currentIndex];

  const isLastQuestion = currentIndex === totalQuestions - 1;

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id] || ""
    : "";

  const handleAnswerChange = (text) => {
    if (!currentQuestion) return;
    setAnswerForQuestion(currentQuestion.id, text);
  };

  const handleSubmitAnswer = async () => {
    if (!currentQuestion) return;

    setIsSubmitting(true);

    try {
      await interviewApi.submitAnswer(id, {
        questionId: currentQuestion.id,
        answerText: currentAnswer,
      });

      toast.success(MESSAGES.ANSWER_SUBMITTED);

      if (isLastQuestion) {
        navigate(buildInterviewSummaryRoute(id));
      } else {
        goToNextQuestion(totalQuestions);
      }
    } catch (submitError) {
      const { message } = parseApiError(submitError);
      toast.error(message || MESSAGES.ANSWER_SUBMIT_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer
      title={interview.jobRole}
      description={`${interview.experienceLevel} • ${interview.interviewType}`}
    >
      <BreadcrumbBar
        items={[
          {
            label: "Interviews",
            to: ROUTES.INTERVIEWS,
          },
          {
            label: interview.jobRole,
          },
        ]}
      />

      {questions.length === 0 ? (
        <EmptyState title="No questions available for this interview." />
      ) : (
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          <div className="flex items-center justify-between gap-3">
            <InterviewProgressBar
              current={currentIndex}
              total={totalQuestions}
            />

            <InterviewTimer startedAt={startedAt} />
          </div>

          <QuestionCard
            question={currentQuestion}
            index={currentIndex}
          />

          <AnswerInput
            value={currentAnswer}
            onChange={handleAnswerChange}
            onSubmit={handleSubmitAnswer}
            onPrevious={goToPreviousQuestion}
            onNext={() => goToNextQuestion(totalQuestions)}
            isFirst={currentIndex === 0}
            isLast={isLastQuestion}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    </PageContainer>
  );
};

export default InterviewSessionPage;