package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "workouts")
public class Workout {
    private String id;
    private String name;
    private String description;


}
