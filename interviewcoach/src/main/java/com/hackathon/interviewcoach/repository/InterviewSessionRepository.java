package com.hackathon.interviewcoach.repository;

import com.hackathon.interviewcoach.entity.InterviewSession;
import com.hackathon.interviewcoach.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterviewSessionRepository extends JpaRepository<InterviewSession, Long> {

    List<InterviewSession> findByUserOrderByCreatedAtDesc(User user);

    Optional<InterviewSession> findByIdAndUser(Long id, User user);

    long countByUser(User user);
}
