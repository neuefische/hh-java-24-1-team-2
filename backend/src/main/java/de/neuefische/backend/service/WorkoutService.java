package de.neuefische.backend.service;

import de.neuefische.backend.repository.WorkoutRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class WorkoutService {
    private final WorkoutRepo repo;

}
