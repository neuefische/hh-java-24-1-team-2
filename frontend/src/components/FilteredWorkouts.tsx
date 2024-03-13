import {MuscleGroup, SportsCategory, Workout} from "../types/Workout.ts";
import {Autocomplete, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import "./FilteredWorkouts.css"
import WorkoutCard from "./WorkoutCard.tsx";

export type FilterWorkoutsProps = {
    workouts: Workout[];
}
export default function FilteredWorkouts(props: Readonly<FilterWorkoutsProps>) {
    const [searchName, setSearchName] = useState<string>("");
    const [searchCategory, setSearchCategory] = useState<string>("");
    const [searchMuscle, setSearchMuscle] = useState<string>("");

    const optionalCategories = Object.values(SportsCategory);
    const optionalMuscles = Object.values(MuscleGroup);

    function handleSearchName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchName(value);
    }

    const sortedWorkouts = [...props.workouts].sort(function (a, b) {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }

        return 0;
    });

    const filteredWorkouts = sortedWorkouts.filter(
        (workout) =>
            workout.name.toLowerCase().includes(searchName.toLowerCase()) &&
            workout.categories.toString().includes(searchCategory) &&
            workout.muscleGroups.toString().includes(searchMuscle)
    );

    return (
        <>
        <div className={"searchForm"}>
            <TextField className="searchTextField" label="Search for workout" type={"search"} value={searchName} onChange={handleSearchName}/>
            <Autocomplete
                disablePortal
                options={optionalCategories}
                onInputChange={(_e, value) => setSearchCategory(value)}
                sx={{m: 1, width: 300}}
                renderInput={(params) => <TextField {...params} label="Choose Category" />}/>
            <Autocomplete
                disablePortal
                options={optionalMuscles}
                onInputChange={(_e, value) => setSearchMuscle(value)}
                sx={{m: 1, width: 300}}
                renderInput={(params) => <TextField {...params} label="Choose Muscle" />}/>
        </div>
            <ul className={"workoutList"}>
                {filteredWorkouts.map(workout => <WorkoutCard
                    key={workout.id}
                    workout={workout}/>)}
            </ul>
        </>
    )
}