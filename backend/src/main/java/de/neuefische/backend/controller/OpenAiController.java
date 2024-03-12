package de.neuefische.backend.controller;


import de.neuefische.backend.model.SportsCategory;
import de.neuefische.backend.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class OpenAiController {
    private final OpenAiService service;
    @GetMapping
    public String askQuestion(@RequestParam String muscle) {
        String categories = Arrays.stream(SportsCategory.values())
                .map(Enum::name)
                .collect(Collectors.joining(", ", "'", "'"));

        String q = "give me 3 workouts as json format for: " + muscle + ". The json should include a name attribute, a categories attribute and a description attribute. " +
                "categories should include one or more of the following for each Workout: " + categories + ". " +
                "Description should not be longer than 50 words.";
        return service.askQuestion(q);
    }
}
