package de.neuefische.backend.model.openai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatGptMessage {
    /**
     {
     "messages":
     [
     {
     "role": "user",
     "content": "Say this is a test!"
     }
     ]
     }
     */

    private String role;
    private String content;

    public ChatGptMessage(String q){
        this.role = "user";
        this.content = q;
    }

}
