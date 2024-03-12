package de.neuefische.backend.controller;


import de.neuefische.backend.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class OpenAiController {
    private final OpenAiService service;
    @GetMapping
    public String askQuestion(@RequestParam String muscle) {

        String q = "give me 3 workouts as json format for: " + muscle + ". The json should include a name attribute, a category attribute and a description attribute. " +
                "category should be one of the following: 'STRENGTH', 'ENDURANCE', 'BALANCE', 'FLEXIBILITY'. " +
                "Description should not be longer than 50 words.";
        return service.askQuestion(q);
    }
}
