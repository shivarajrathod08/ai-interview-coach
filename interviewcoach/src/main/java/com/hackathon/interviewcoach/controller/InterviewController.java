package com.hackathon.interviewcoach.controller;

import com.hackathon.interviewcoach.dto.request.CreateInterviewRequest;
import com.hackathon.interviewcoach.dto.request.SubmitAnswerRequest;
import com.hackathon.interviewcoach.dto.response.AnswerEvaluationResponse;
import com.hackathon.interviewcoach.dto.response.InterviewSessionResponse;
import com.hackathon.interviewcoach.dto.response.InterviewSummaryResponse;
import com.hackathon.interviewcoach.service.InterviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/interviews")
@RequiredArgsConstructor
@Tag(name = "Interviews", description = "Endpoints for managing interview sessions")
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping
    @Operation(summary = "Create a new interview session and generate questions")
    public ResponseEntity<InterviewSessionResponse> createInterview(
            @Valid @RequestBody CreateInterviewRequest request) {
        InterviewSessionResponse response = interviewService.createInterview(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "List all interview sessions for the current user")
    public ResponseEntity<List<InterviewSessionResponse>> getUserInterviews() {
        return ResponseEntity.ok(interviewService.getUserInterviews());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a single interview session by id")
    public ResponseEntity<InterviewSessionResponse> getInterviewById(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getInterviewById(id));
    }

    @PostMapping("/{id}/answers")
    @Operation(summary = "Submit an answer for a question in an interview session")
    public ResponseEntity<AnswerEvaluationResponse> submitAnswer(
            @PathVariable Long id, @Valid @RequestBody SubmitAnswerRequest request) {
        return ResponseEntity.ok(interviewService.submitAnswer(id, request));
    }

    @GetMapping("/{id}/summary")
    @Operation(summary = "Get the summary and results of an interview session")
    public ResponseEntity<InterviewSummaryResponse> getSummary(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getSummary(id));
    }
}
