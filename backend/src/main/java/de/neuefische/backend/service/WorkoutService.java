package de.neuefische.backend.service;

import de.neuefische.backend.model.Workout;
import de.neuefische.backend.repository.WorkoutRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class WorkoutService {
    private final WorkoutRepo repo;

    public Workout saveNewWorkout(Workout workout) {
        Workout temp = workout.withId(null);
        repo.save(temp);
        return repo.findById(temp.getId()).orElseThrow();
    }

    public Workout update(String id,Workout workout) {
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
