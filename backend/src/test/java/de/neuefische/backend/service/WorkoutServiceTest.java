package de.neuefische.backend.service;

import de.neuefische.backend.model.Workout;
import de.neuefische.backend.repository.WorkoutRepo;
import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


class WorkoutServiceTest {
    WorkoutRepo repo = mock(WorkoutRepo.class);
    WorkoutService service = new WorkoutService(repo);

    @Test
    void update() {
        //GIVEN
        String id = "123";
        Workout workout =new Workout(id,"test-name", "test-description");
        Workout updatedWorkout=new Workout(id,"test-name-change","test-description-change");

        when(repo.findById(id)).thenReturn(java.util.Optional.of(workout));
        when(repo.save(any(Workout.class))).thenReturn(updatedWorkout);

        //WHEN
        Workout actual = service.update(id,updatedWorkout);

        //THEN
        verify(repo, times(1)).findById(id);
        verify(repo, times(1)).save(any(Workout.class));
    }
}