package com.hackathon.interviewcoach.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateInterviewRequest {

    @NotBlank(message = "Job role is required")
    private String jobRole;

    @NotBlank(message = "Experience level is required")
    private String experienceLevel;

    @NotBlank(message = "Interview type is required")
    private String interviewType;

    @NotNull(message = "Number of questions is required")
    @Min(value = 1, message = "Must request at least 1 question")
    @Max(value = 20, message = "Cannot request more than 20 questions")
    private Integer numberOfQuestions;
}
