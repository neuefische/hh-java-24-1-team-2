package de.neuefische.backend.service;

import de.neuefische.backend.model.Workout;
import de.neuefische.backend.model.WorkoutDto;
import de.neuefische.backend.repository.WorkoutRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class WorkoutService {
    private final WorkoutRepo repo;

    public Workout saveNewWorkout(WorkoutDto workoutDto) {
        Workout temp = new Workout(null, workoutDto.getName(), workoutDto.getDescription());
        return repo.save(temp);
    }

    public Workout update(String id, Workout workout) {
          Workout temp=repo.findById(id).orElseThrow();
          temp.setName(workout.getName());
          temp.setDescription(workout.getDescription());
          return repo.save(temp);
    }
    public String deleteById(String id) {
        repo.deleteById(id);
        return "Workout with ID: " + id + " deleted.";
    }
}
