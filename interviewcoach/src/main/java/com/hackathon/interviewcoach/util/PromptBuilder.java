package com.hackathon.interviewcoach.util;

public final class PromptBuilder {

    private PromptBuilder() {
    }

    public static String buildQuestionGenerationPrompt(String jobRole, String experienceLevel,
                                                         String interviewType, int numberOfQuestions,
                                                         String difficulty) {
        return """
                You are an expert technical interviewer. Generate %d interview questions for a candidate
                applying for the role of "%s" at "%s" experience level, focused on "%s" interview type.
                The difficulty level of the questions should be "%s".

                Respond ONLY with a valid JSON array of strings, where each string is one question.
                Do not include any explanation, markdown formatting, or extra text.
                Example format: ["Question 1 text", "Question 2 text"]
                """.formatted(numberOfQuestions, jobRole, experienceLevel, interviewType, difficulty);
    }

    public static String buildEvaluationPrompt(String jobRole, String questionText, String answerText) {
        return """
                You are an expert interview evaluator for the role of "%s".
                Evaluate the following candidate answer to the interview question.

                Question: %s
                Candidate Answer: %s

                Respond ONLY with a valid JSON object in exactly this format, no markdown, no extra text:
                {
                  "score": <number between 0 and 100>,
                  "strengths": "<short paragraph of strengths>",
                  "weaknesses": "<short paragraph of weaknesses>",
                  "topicsToRevise": "<comma separated topics the candidate should revise>",
                  "feedback": "<concise overall constructive feedback>"
                }
                """.formatted(jobRole, questionText, answerText);
    }

    public static String nextDifficulty(String currentDifficulty, double lastScore) {
        if (lastScore >= 75) {
            return switch (currentDifficulty.toUpperCase()) {
                case "EASY" -> "MEDIUM";
                case "MEDIUM" -> "HARD";
                default -> "HARD";
            };
        } else if (lastScore < 40) {
            return switch (currentDifficulty.toUpperCase()) {
                case "HARD" -> "MEDIUM";
                case "MEDIUM" -> "EASY";
                default -> "EASY";
            };
        }
        return currentDifficulty;
    }
}
