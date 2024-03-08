package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WorkoutDto {
    private String name;
    private String description;
    private Category category;
    private MuscleGroup muscleGroup;
}