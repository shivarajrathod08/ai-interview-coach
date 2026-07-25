package com.hackathon.interviewcoach.repository;

import com.hackathon.interviewcoach.entity.InterviewSession;
import com.hackathon.interviewcoach.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findBySessionOrderByQuestionOrderAsc(InterviewSession session);

    Optional<Question> findBySessionAndQuestionOrder(InterviewSession session, Integer questionOrder);

    long countBySession(InterviewSession session);
}
