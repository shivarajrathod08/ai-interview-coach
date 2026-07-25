package com.hackathon.interviewcoach.service;

import com.hackathon.interviewcoach.dto.response.DashboardResponse;
import com.hackathon.interviewcoach.entity.InterviewSession;
import com.hackathon.interviewcoach.entity.User;
import com.hackathon.interviewcoach.exception.ResourceNotFoundException;
import com.hackathon.interviewcoach.repository.InterviewSessionRepository;
import com.hackathon.interviewcoach.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final InterviewSessionRepository sessionRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {
        User user = getCurrentUser();
        List<InterviewSession> sessions = sessionRepository.findByUserOrderByCreatedAtDesc(user);

        long totalInterviews = sessions.size();

        List<InterviewSession> completedSessions = sessions.stream()
                .filter(s -> s.getStatus() == InterviewSession.SessionStatus.COMPLETED)
                .collect(Collectors.toList());

        long completedInterviews = completedSessions.size();

        double averageScore = completedSessions.stream()
                .filter(s -> s.getOverallScore() != null)
                .mapToDouble(InterviewSession::getOverallScore)
                .average()
                .orElse(0.0);

        Map<String, Double> averageScoreByJobRole = completedSessions.stream()
                .filter(s -> s.getOverallScore() != null)
                .collect(Collectors.groupingBy(
                        InterviewSession::getJobRole,
                        LinkedHashMap::new,
                        Collectors.averagingDouble(InterviewSession::getOverallScore)));

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        List<DashboardResponse.ScoreTrendPoint> scoreTrend = completedSessions.stream()
                .filter(s -> s.getOverallScore() != null)
                .sorted((a, b) -> a.getCreatedAt().compareTo(b.getCreatedAt()))
                .map(s -> DashboardResponse.ScoreTrendPoint.builder()
                        .sessionId(s.getId())
                        .jobRole(s.getJobRole())
                        .score(s.getOverallScore())
                        .createdAt(s.getCreatedAt().format(formatter))
                        .build())
                .collect(Collectors.toList());

        return DashboardResponse.builder()
                .totalInterviews(totalInterviews)
                .completedInterviews(completedInterviews)
                .averageScore(averageScore)
                .averageScoreByJobRole(averageScoreByJobRole)
                .scoreTrend(scoreTrend)
                .build();
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }
}
