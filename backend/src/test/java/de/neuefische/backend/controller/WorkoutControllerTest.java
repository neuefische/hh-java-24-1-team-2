package de.neuefische.backend.controller;


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

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.awt.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class WorkoutControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private WorkoutRepo repo;
    @Test
    void update() throws Exception {
            //GIVEN
            Workout existingTodo = new Workout("1", "test-name", "test-description");
            repo.save(existingTodo);

            //WHEN
            mvc.perform(put("/api/workout/1")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("""
                                    {
                                        "name": "test-name",
                                        "description": "test-description"
                                    }
                                """))
                    //THEN
                    .andExpect(status().isOk())
                    .andExpect(content().json("""
                            {
                                "id": "1",
                                "name": "test-name",
                                "description": "test-description"
                            }
                        """));
        }

    @Test
    void deleteWorkoutById() throws Exception {
        //GIVEN
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.delete("/api/workout/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }
}