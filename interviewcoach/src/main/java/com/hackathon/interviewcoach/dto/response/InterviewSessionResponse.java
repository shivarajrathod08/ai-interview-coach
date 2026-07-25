package com.hackathon.interviewcoach.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSessionResponse {
    private Long id;
    private String jobRole;
    private String experienceLevel;
    private String interviewType;
    private Integer totalQuestions;
    private Integer currentQuestionIndex;
    private String status;
    private Double overallScore;
    private LocalDateTime createdAt;
    private List<QuestionResponse> questions;
}
