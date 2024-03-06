package de.neuefische.backend.service;

import de.neuefische.backend.model.Workout;
import de.neuefische.backend.model.WorkoutDto;
import de.neuefische.backend.repository.WorkoutRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class WorkoutServiceTest {

    private final WorkoutRepo repo = mock(WorkoutRepo.class);
    WorkoutService service = new WorkoutService(repo);

    @Test
    void saveNewWorkout() {
        // GIVEN
        WorkoutDto workoutDto = new WorkoutDto("Push Up", "Do the push up");
        when(repo.save(any(Workout.class)))
                .thenReturn(new Workout("generated-id", workoutDto.getName(), workoutDto.getDescription()));

        // WHEN
        Workout savedWorkout = service.saveNewWorkout(workoutDto);

        // THEN
        assertEquals("generated-id", savedWorkout.getId());
        verify(repo, times(1)).save(any(Workout.class));
    }

    @Test
    void deleteById() {
        //GIVEN
        Workout workout2 = new Workout("2", "Pull Up", "Pull Up");
        repo.save(workout2);
        String expected = "Workout with ID: 2 deleted.";
        //WHEN
        String actual = service.deleteById("2");
        //THEN
        assertEquals(expected, actual);
        verify(repo).deleteById("2");

    }
    @Test
    void getAllWorkouts_shouldReturnEmptyList_whenCalledInitially() {
        //GIVEN
        List<Workout> expected = List.of();
        when(repo.findAll()).thenReturn(expected);
        //WHEN
        List<Workout> actual = service.getAllWorkouts();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
    }
    @Test
    void getAllWorkouts_ReturnList1_WhenCalled() {
        //GIVEN
        List<Workout> expected = List.of(new Workout("1", "test-name", "test-description"));
        when(repo.findAll()).thenReturn(expected);
        //WHEN
        List<Workout> actual = service.getAllWorkouts();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
    }
    @Test
    void update() {
        //GIVEN
        String id = "123";
        Workout workout = new Workout(id, "test-name", "test-description");
        Workout expected = new Workout(id, "test-name-change", "test-description-change");

        when(repo.findById(id)).thenReturn(Optional.of(workout));
        when(repo.save(any(Workout.class))).thenReturn(expected);

        //WHEN
        Workout actual = service.update(id, expected);

        //THEN
        verify(repo, times(1)).findById(id);
        verify(repo, times(1)).save(any(Workout.class));
        assertEquals(expected, actual);
    }
}
