import { Workout } from "../types/Workout.ts";
import axios from "axios";
import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import "/src/App.css"
export type Props = {
    workouts: Workout[],
};
export default function EditWorkoutPage(props: Props) {
    const params = useParams();
    const navigate = useNavigate();

    const workout = props.workouts.find(workout => workout.id === params.id);
    const [name, setName] = useState(workout?.name || '');
    const [description, setDescription] = useState(workout?.description || '');

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    function changeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function editThisItem(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(workout !== undefined) {
            axios.put("/api/workouts/" + workout.id, {
                name: name,
                description: description,
            })
                .then(response => {
                    // Handle successful response if needed
                    console.log("Workout updated successfully:", response.data);
                    navigate("/workouts");
                })
                .catch(error => {
                    // Handle error if needed
                    console.error("Error updating workout:", error);
                });
        }
    }

    return (
        <>
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
                    <button type="submit">Edit</button>
                </form>
            </div>
        </>
    );
}