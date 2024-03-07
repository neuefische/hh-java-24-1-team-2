package de.neuefische.backend.controller;

import de.neuefische.backend.model.Workout;
import de.neuefische.backend.model.WorkoutDto;
import de.neuefische.backend.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
public class WorkoutController {
    private final WorkoutService service;
    @PutMapping("/{id}")
    public Workout update(@PathVariable String id,@RequestBody Workout workout){
        return service.update(id,workout);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Workout saveNewWorkout(@RequestBody WorkoutDto workoutDto) {
        return service.saveNewWorkout(workoutDto);
    }


    @DeleteMapping("/{id}")
    public void deleteWorkoutById(@PathVariable String id){
        service.deleteById(id);
    }
}
