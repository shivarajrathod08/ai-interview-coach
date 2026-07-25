package com.hackathon.interviewcoach.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerEvaluationResponse {
    private Long answerId;
    private Long questionId;
    private Double score;
    private String strengths;
    private String weaknesses;
    private String topicsToRevise;
    private String aiFeedback;
    private QuestionResponse nextQuestion;
    private boolean sessionCompleted;
}
