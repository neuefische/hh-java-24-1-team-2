import {Workout} from "../types/Workout.ts";
import axios from "axios";
import {FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "/src/App.css"
import CategoryMuscleCheckbox from "../components/CategoryMuscleCheckbox.tsx";
import {SelectChangeEvent} from "@mui/material";

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
        const value=event.target.value;
        setCategories(typeof value === 'string' ? value.split(',') : value,);
    }

    function changeMuscleGroups(event: SelectChangeEvent<typeof muscleGroups>) {
        const value=event.target.value;
        setMuscleGroups(typeof value === 'string' ? value.split(',') : value,);
    }

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
            <div className="edit-title">
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
                    <CategoryMuscleCheckbox categories={categories} changeCategories={changeCategories} muscleGroups={muscleGroups} changeMuscleGroups={changeMuscleGroups}/>
                    <br/>
                    <button type="submit">Edit</button>
                </form>
            </div>
            </div>
        </>
    );
}