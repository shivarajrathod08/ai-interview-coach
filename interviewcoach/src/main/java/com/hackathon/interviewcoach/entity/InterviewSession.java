package com.hackathon.interviewcoach.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "interview_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "job_role", nullable = false)
    private String jobRole;

    @Column(name = "experience_level", nullable = false)
    private String experienceLevel;

    @Column(name = "interview_type", nullable = false)
    private String interviewType;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    @Column(name = "current_question_index", nullable = false)
    @Builder.Default
    private Integer currentQuestionIndex = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private SessionStatus status = SessionStatus.IN_PROGRESS;

    @Column(name = "overall_score")
    private Double overallScore;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum SessionStatus {
        IN_PROGRESS,
        COMPLETED
    }
}
