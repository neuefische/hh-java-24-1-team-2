package de.neuefische.backend.controller;

import de.neuefische.backend.model.MuscleGroup;
import de.neuefische.backend.model.SportsCategory;
import de.neuefische.backend.model.Workout;
import de.neuefische.backend.model.WorkoutDto;
import de.neuefische.backend.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
public class WorkoutController {
    private final WorkoutService service;
    @GetMapping
    public List<Workout> getAllWorkouts(){
        return service.getAllWorkouts();
    }
    @GetMapping("/{id}")
    public Workout getWorkoutById(@PathVariable String id){
        return service.getWorkoutById(id);
    }

    @GetMapping("/filter")
    public List<Workout> filterWorkout(@RequestParam(required = false) String name,
                                       @RequestParam(required = false) SportsCategory category,
                                       @RequestParam(required = false) MuscleGroup muscle){
        return service.filterWorkout(name, category, muscle);
    }

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
