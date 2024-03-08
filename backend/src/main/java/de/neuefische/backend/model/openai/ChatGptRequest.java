package de.neuefische.backend.model.openai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ChatGptRequest {
    /**
     {
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "Say this is a test!"}],

     }
     */

    private String model;
    private List<ChatGptMessage> messages;

    public ChatGptRequest(String q){
        this.model = "gpt-3.5-turbo";
        this.messages = List.of(new ChatGptMessage(q));
    }
}
