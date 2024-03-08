package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@With
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "workouts")
public class Workout {
    private String id;
    private String name;
    private String description;
    private List<SportsCategory> categories = new ArrayList<>();
    private List<MuscleGroup> muscleGroups = new ArrayList<>();
}
