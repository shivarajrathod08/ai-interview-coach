package com.hackathon.interviewcoach.repository;

import com.hackathon.interviewcoach.entity.Answer;
import com.hackathon.interviewcoach.entity.InterviewSession;
import com.hackathon.interviewcoach.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

    Optional<Answer> findByQuestion(Question question);

    @org.springframework.data.jpa.repository.Query(
            "select a from Answer a where a.question.session = :session order by a.question.questionOrder asc")
    List<Answer> findBySessionOrderByQuestionOrder(@org.springframework.data.jpa.repository.Param("session") InterviewSession session);

    @org.springframework.data.jpa.repository.Query(
            "select a from Answer a where a.question.session.user.id = :userId")
    List<Answer> findAllByUserId(@org.springframework.data.jpa.repository.Param("userId") Long userId);
}
