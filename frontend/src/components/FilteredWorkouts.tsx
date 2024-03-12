import {MuscleGroup, SportsCategory, Workout} from "../types/Workout.ts";
import {Autocomplete, TextField} from "@mui/material";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import {Autocomplete, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";

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

    const filteredWorkouts = props.workouts.sort(function (a, b) {
                                                            if (a.name < b.name) {
                                                                return -1;
                                                            }
                                                            if (a.name > b.name) {
                                                                return 1;
                                                            }
                                                            return 0;})
                                                      .filter(workout =>
                                                          workout.name.toLowerCase().includes(searchName) &&
                                                          workout.categories.toString().includes(searchCategory) &&
                                                          workout.muscleGroups.toString().includes(searchMuscle));


    return (
        <>
            <label>
                Search for:
                <input type={"search"} value={searchName} onChange={handleSearchName}/>
                <input type={"text"} value={searchName} onChange={handleSearchName}/>
                <input type={"search"} value={searchName} onChange={handleSearchName}/>
                <input type={"text"} value={searchName} onChange={handleSearchName}/>
                <input type={"search"} value={searchName} onChange={handleSearchName}/>
            </label>
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
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel>Choose category</InputLabel>
                <Select
                    value={searchCategory}
                    onChange={handleSearchCategory}
                    input={<OutlinedInput label="Choose category"/>}
                >
                    {optionalCategories.map(category =>
                        <MenuItem
                            key={category}
                            value={category}
                        >
                            {category}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            <br/>
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel>Choose muscle</InputLabel>
                <Select
                    value={searchMuscle}
                    onChange={handleSearchMuscle}
                    input={<OutlinedInput label="Choose muscle"/>}
                >
                    {optionalMuscles.map(muscle =>
                        <MenuItem
                            key={muscle}
                            value={muscle}
                        >
                            {muscle}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
                <input type={"search"} value={searchName} onChange={handleSearchName}/>
            </label>
            <Autocomplete
                disablePortal
                options={optionalCategories}
                onInputChange={(_e, value) => setSearchCategory(value)}
                sx={{m: 1, width: 300}}
                renderInput={(params) => <TextField {...params} label="Choose Category"/>}/>
            <Autocomplete
                disablePortal
                options={optionalMuscles}
                onInputChange={(_e, value) => setSearchMuscle(value)}
                sx={{m: 1, width: 300}}
                renderInput={(params) => <TextField {...params} label="Choose Muscle"/>}/>
            <ul>
                {filteredWorkouts.map(workout => (
                    <li key={workout.id}>
                        <Link to={`/workouts/${workout.id}`}>
                            {workout.name}
                        </Link>
                    </li>
                ))}
            </ul>

        </>
    )
}