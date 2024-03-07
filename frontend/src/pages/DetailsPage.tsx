import {Workout} from "../types/Workout.ts";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

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
            axios.delete("/api/workouts/"+workout.id)
                .then(props.fetchData);
            navigate("/workouts");
        }

    }
    return (
        <div>
            <h1>Details Page</h1>
            <p>View the details of your workout here</p>
        </div>
    )
}