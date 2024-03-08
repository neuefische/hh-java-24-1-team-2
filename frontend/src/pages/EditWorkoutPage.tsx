import { Workout } from "../types/Workout.ts";
import axios from "axios";
import {FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "/src/App.css"
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

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }

    function changeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function editThisItem(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(workout !== undefined) {
            axios.put("/api/workouts/" + workout.id, {
                name: name,
                description: description,
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
                    <button type="submit">Edit</button>
                </form>
            </div>
            </div>
        </>
    );
}