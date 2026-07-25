package com.hackathon.interviewcoach.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon.interviewcoach.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
@RequiredArgsConstructor
public class GeminiService {

    private final WebClient geminiWebClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${app.gemini.api-key}")
    private String apiKey;

    public List<String> generateQuestions(String prompt, int expectedCount) {
        String rawText = callGemini(prompt);
        String jsonArray = extractJson(rawText, '[', ']');

        try {
            List<String> questions = new ArrayList<>();
            JsonNode node = objectMapper.readTree(jsonArray);
            if (node.isArray()) {
                node.forEach(q -> questions.add(q.asText()));
            }
            if (questions.isEmpty()) {
                throw new BadRequestException("Gemini returned no questions");
            }
            return questions;
        } catch (Exception e) {
            log.error("Failed to parse Gemini question generation response: {}", rawText, e);
            throw new BadRequestException("Failed to generate interview questions. Please try again.");
        }
    }

    public EvaluationResult evaluateAnswer(String prompt) {
        String rawText = callGemini(prompt);
        String jsonObject = extractJson(rawText, '{', '}');

        try {
            JsonNode node = objectMapper.readTree(jsonObject);
            double score = node.path("score").asDouble(0);
            String strengths = node.path("strengths").asText("");
            String weaknesses = node.path("weaknesses").asText("");
            String topicsToRevise = node.path("topicsToRevise").asText("");
            String feedback = node.path("feedback").asText("");
            return new EvaluationResult(score, strengths, weaknesses, topicsToRevise, feedback);
        } catch (Exception e) {
            log.error("Failed to parse Gemini evaluation response: {}", rawText, e);
            throw new BadRequestException("Failed to evaluate answer. Please try again.");
        }
    }

    private String callGemini(String prompt) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new BadRequestException("Gemini API key is not configured");
        }

        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));

        try {
            JsonNode response = geminiWebClient.post()
                    .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            if (response == null) {
                throw new BadRequestException("Empty response from Gemini API");
            }

            return response
                    .path("candidates").path(0)
                    .path("content").path("parts").path(0)
                    .path("text").asText();
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error calling Gemini API", e);
            throw new BadRequestException("Failed to communicate with Gemini AI service");
        }
    }

    private String extractJson(String text, char openChar, char closeChar) {
        if (text == null) {
            throw new BadRequestException("Empty response from AI service");
        }
        int start = text.indexOf(openChar);
        int end = text.lastIndexOf(closeChar);
        if (start == -1 || end == -1 || end < start) {
            Pattern pattern = Pattern.compile(Pattern.quote(String.valueOf(openChar)) + ".*"
                    + Pattern.quote(String.valueOf(closeChar)), Pattern.DOTALL);
            Matcher matcher = pattern.matcher(text);
            if (matcher.find()) {
                return matcher.group();
            }
            throw new BadRequestException("Could not parse AI service response");
        }
        return text.substring(start, end + 1);
    }

    public record EvaluationResult(double score, String strengths, String weaknesses,
                                    String topicsToRevise, String feedback) {
    }
}
