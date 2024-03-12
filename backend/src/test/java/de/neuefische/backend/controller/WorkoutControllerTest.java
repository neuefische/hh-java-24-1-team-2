package de.neuefische.backend.controller;

import de.neuefische.backend.model.MuscleGroup;
import de.neuefische.backend.model.SportsCategory;
import de.neuefische.backend.model.Workout;
import de.neuefische.backend.repository.WorkoutRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class WorkoutControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private WorkoutRepo repo;

    @Test
    void saveNewWorkout() throws Exception {
        // GIVEN
        String requestBody = """
                    {
                        "name": "New Workout",
                        "description": "Description for the new workout"
                    }
                """;

        // WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/workouts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("New Workout"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("Description for the new workout"));
    }

    @Test
    void getAllWorkouts_ReturnEmptyList_WhenCalledInitially() throws Exception {
        //GIVEN
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/workouts"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"))
                .andReturn();
    }

    @Test
    void getAllWorkouts_ReturnId1nameTestNameDescriptionTestDescription_WhenCalledWithOneWorkout() throws Exception {
        //GIVEN
        Workout workout = new Workout("1", "test-name", "test-description", List.of(SportsCategory.STRENGTH, SportsCategory.ENDURANCE), List.of(MuscleGroup.LEGS, MuscleGroup.GLUTES));
        repo.save(workout);
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/workouts"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                            [
                                {
                                    "id": "1",
                                    "name": "test-name",
                                    "description": "test-description",
                                    "categories": ["STRENGTH", "ENDURANCE"],
                                    "muscleGroups": ["LEGS", "GLUTES"]
                                }
                            ]
                        """))
                .andReturn();
    }

    @Test
    void getWorkoutById_ReturnWorkoutWithId1_WhenCalledWithId1() throws Exception {
        //GIVEN
        Workout workout = new Workout("1", "test-name", "test-description", List.of(SportsCategory.STRENGTH, SportsCategory.ENDURANCE), List.of(MuscleGroup.LEGS, MuscleGroup.GLUTES));
        repo.save(workout);
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/workouts/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                            {
                                "id": "1",
                                "name": "test-name",
                                "description": "test-description",
                                "categories": ["STRENGTH", "ENDURANCE"],
                                "muscleGroups": ["LEGS", "GLUTES"]
                            }
                        """))
                .andReturn();
    }

    @Test
    void update() throws Exception {
        //GIVEN
        Workout existingTodo = new Workout("1", "test-name", "test-description", List.of(SportsCategory.STRENGTH, SportsCategory.ENDURANCE), List.of(MuscleGroup.LEGS, MuscleGroup.GLUTES));
        repo.save(existingTodo);

        //WHEN
        mvc.perform(put("/api/workouts/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                        "name": "test-name",
                                        "description": "test-description",
                                "categories": ["STRENGTH", "ENDURANCE"],
                                "muscleGroups": ["LEGS", "GLUTES"]
                                    }
                                """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                                "id": "1",
                                "name": "test-name",
                                "description": "test-description",
                                "categories": ["STRENGTH", "ENDURANCE"],
                                "muscleGroups": ["LEGS", "GLUTES"]
                            }
                        """));
    }

    @Test
    void deleteWorkoutById() throws Exception {
        //GIVEN
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.delete("/api/workouts/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }
}