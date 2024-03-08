package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class WorkoutDto {
    private String name;
    private String description;
    private List<SportsCategory> categories;
    private List<MuscleGroup> muscleGroups;
}