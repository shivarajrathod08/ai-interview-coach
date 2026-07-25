package com.hackathon.interviewcoach.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {
    private long totalInterviews;
    private long completedInterviews;
    private double averageScore;
    private Map<String, Double> averageScoreByJobRole;
    private List<ScoreTrendPoint> scoreTrend;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScoreTrendPoint {
        private Long sessionId;
        private String jobRole;
        private Double score;
        private String createdAt;
    }
}
