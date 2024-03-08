package de.neuefische.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.WorkoutDto;
import de.neuefische.backend.model.openai.ChatGptRequest;
import de.neuefische.backend.model.openai.ChatGptResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service

public class OpenAiService {
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public OpenAiService(
                        @Value("${open.ai.url}") String apiUrl,
                        @Value("${open.ai.api.key}") String apiKey) {

        restClient = RestClient.builder()
                .baseUrl(apiUrl)
                .defaultHeader("Authorization", apiKey)
                .build();
        objectMapper = new ObjectMapper();
    }

    public List<WorkoutDto> askQuestion(String q) throws JsonProcessingException {
        ChatGptRequest request = new ChatGptRequest(q);
        ChatGptResponse response = restClient.post()
                .body(request)
                .retrieve()
                .body(ChatGptResponse.class);
        assert response != null;
        return List.of(objectMapper.readValue(response.getAnswer(), WorkoutDto[].class));
    }


}
