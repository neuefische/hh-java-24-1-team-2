import {MuscleGroup, SportsCategory, Workout} from "../types/Workout.ts";
import axios from "axios";
import {FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "/src/App.css"
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";

export type Props = {
    workouts: Workout[],
    fetchData: ()=>void
};
export default function EditWorkoutPage(props: Props) {
    const params = useParams();
    const navigate = useNavigate();

    const workout = props.workouts.find(workout => workout.id === params.id);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories]=useState<string[]>([]);
    const [muscleGroups, setMuscleGroups]=useState<string[]>([]);

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    function changeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function changeCategories(event: SelectChangeEvent<typeof categories>) {
        const {
            target: {value},
        }=event;
        setCategories(typeof value === 'string' ? value.split(',') : value,);
    }

    const optionalCategories=Object.values(SportsCategory);

    function changeMuscleGroups(event: SelectChangeEvent<typeof muscleGroups>) {
        const {
            target: {value},
        }=event;
        setMuscleGroups(typeof value === 'string' ? value.split(',') : value,);
    }

    const optionalMuscles=Object.values(MuscleGroup);

    function editThisItem(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(workout !== undefined) {
            axios.put("/api/workouts/" + workout.id, {
                name: name,
                description: description,
                categories: categories,
                muscleGroups: muscleGroups,
            })
                .then(props.fetchData);
                    navigate("/workouts/"+ workout.id);
        }
    }

    return (
        <>
            <div style={{textAlign:"center"}}>
            <h1>Edit Workout Page</h1>
            <div className="edit-workout-container">

                <p>Edit your workout here</p>
                <form onSubmit={editThisItem}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={changeName}/>
                    </label>
                    <br/>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={changeText}/>
                    </label>
                    <br/>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel>Categories</InputLabel>
                        <Select
                            multiple
                            value={categories}
                            onChange={changeCategories}
                            input={<OutlinedInput label="Categories" />}
                        >
                            {optionalCategories.map(category=>
                                <MenuItem
                                    value={category}
                                >
                                    {category}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <br/>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel>Muscle Groups</InputLabel>
                        <Select
                            multiple
                            value={muscleGroups}
                            onChange={changeMuscleGroups}
                            input={<OutlinedInput label="MuscleGroups" />}
                        >
                            {optionalMuscles.map(muscle=>
                                <MenuItem
                                    value={muscle}
                                >
                                    {muscle}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <br/>
                    <button type="submit">Edit</button>
                </form>
            </div>
            </div>
        </>
    );
}