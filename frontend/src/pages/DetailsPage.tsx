import {Workout} from "../types/Workout.ts";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./DetailsPage.css"

type DetailsPageProps={
    workouts: Workout[],
    fetchData: ()=>void
}

export default function DetailsPage(props: Readonly<DetailsPageProps>) {
    const params = useParams();
    const workout = props.workouts.find(workout => workout.id === params.id);
    const navigate = useNavigate();

    function handleDelete(){
        if(workout !== undefined){
            axios.delete(`/api/workouts/`+workout.id)
                .then(props.fetchData);
            navigate("/");
        }
    }
    function handleEdit() {
        if (workout !== undefined) {
            navigate(`/workouts/`+workout.id+`/edit`);
        }
    }

    return (
        <div className="container">
            <h1>Details Page</h1>
            {workout ?
                <div className={"workoutDetails"}>
                    <h3>{workout.name}</h3>
                    <p>Description: {workout.description}</p>
                    <p>Categories: {workout.categories.join(', ')}</p>
                    <p>Muscle Groups: {workout.muscleGroups.join(', ')}</p>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleEdit}>Edit</button>
                </div> :
                <>No workout found</>
            }
        </div>
    )
}