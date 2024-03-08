package de.neuefische.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import de.neuefische.backend.model.WorkoutDto;
import de.neuefische.backend.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class OpenAiController {
    private final OpenAiService service;
    @GetMapping
    public List<WorkoutDto> askQuestion(@RequestParam String muscle) throws JsonProcessingException {
        String q = "give me 3 workouts as json format for: " +  muscle + ". The json should not be formatted, but the workouts should be in a list. the description should  include a name attribute, and a description attribute. Description should not be longer than 50 words. Json should also be plain text.";
        return service.askQuestion(q);
    }


}
