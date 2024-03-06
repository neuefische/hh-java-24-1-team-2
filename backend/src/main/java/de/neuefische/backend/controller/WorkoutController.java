package de.neuefische.backend.controller;

import de.neuefische.backend.model.Workout;
import de.neuefische.backend.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workout")
@RequiredArgsConstructor
public class WorkoutController {
    private final WorkoutService service;
    @PutMapping("/{id}")
    public Workout update(@PathVariable String id,@RequestBody Workout workout){
        return service.update(id,workout);
    }


    @DeleteMapping("/{id}")
    public void deleteWorkoutById(@PathVariable String id){
        service.deleteById(id);
    }
}
