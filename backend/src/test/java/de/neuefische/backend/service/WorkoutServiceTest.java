package de.neuefische.backend.service;

import de.neuefische.backend.model.MuscleGroup;
import de.neuefische.backend.model.SportsCategory;
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
        WorkoutDto workoutDto = new WorkoutDto("Push Up", "Do the push up", List.of(SportsCategory.HIIT, SportsCategory.CARDIO), List.of(MuscleGroup.LEGS, MuscleGroup.GLUTES));
        when(repo.save(any(Workout.class)))
                .thenReturn(new Workout("generated-id", workoutDto.getName(), workoutDto.getDescription(), workoutDto.getCategories(), workoutDto.getMuscleGroups()));

        // WHEN
        Workout savedWorkout = service.saveNewWorkout(workoutDto);

        // THEN
        assertEquals("generated-id", savedWorkout.getId());
        verify(repo, times(1)).save(any(Workout.class));
    }

    @Test
    void deleteById() {
        //GIVEN
        Workout workout2 = new Workout("2", "Pull Up", "Pull Up", List.of(SportsCategory.HIIT, SportsCategory.CARDIO), List.of(MuscleGroup.LEGS, MuscleGroup.GLUTES));
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
        List<Workout> expected = List.of(new Workout("1", "test-name", "test-description", List.of(SportsCategory.HIIT, SportsCategory.CARDIO), List.of(MuscleGroup.LEGS, MuscleGroup.GLUTES)));
        when(repo.findAll()).thenReturn(expected);
        //WHEN
        List<Workout> actual = service.getAllWorkouts();
        //THEN
        assertEquals(expected, actual);
        verify(repo).findAll();
    }
    @Test
    void getWorkoutById_ReturnWorkoutWithId1_WhenCalledWithId1() {
        //GIVEN
        String id = "1";
        Workout expected = new Workout(id, "test-name", "test-description", List.of(SportsCategory.HIIT, SportsCategory.CARDIO), List.of(MuscleGroup.LEGS, MuscleGroup.GLUTES));
        when(repo.findById(id)).thenReturn(Optional.of(expected));
        //WHEN
        Workout actual = service.getWorkoutById(id);
        //THEN
        assertEquals(expected, actual);
        verify(repo).findById(id);
    }
    @Test
    void update() {
        //GIVEN
        String id = "123";
        Workout workout = new Workout(id, "test-name", "test-description", List.of(SportsCategory.HIIT, SportsCategory.CARDIO), List.of(MuscleGroup.LEGS, MuscleGroup.GLUTES));
        Workout expected = new Workout(id, "test-name-change", "test-description-change", List.of(SportsCategory.HIIT, SportsCategory.STRENGTH), List.of(MuscleGroup.LEGS));

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
