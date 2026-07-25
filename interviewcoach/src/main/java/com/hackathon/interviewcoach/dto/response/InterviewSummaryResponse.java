package com.hackathon.interviewcoach.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSummaryResponse {
    private Long sessionId;
    private String jobRole;
    private Double overallScore;
    private String status;
    private List<AnswerDetail> answers;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AnswerDetail {
        private Long questionId;
        private String questionText;
        private String answerText;
        private Double score;
        private String strengths;
        private String weaknesses;
        private String topicsToRevise;
    }
}
