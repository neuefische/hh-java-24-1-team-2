import {Workout} from "../types/Workout.ts";
import {useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

type HomePageProps = {
    workouts: Workout[]
    setWorkouts: (workouts: Workout[]) => void
}

export default function HomePage(props: Readonly<HomePageProps>) {


    function fetchWorkouts(){
        axios.get("/api/workouts")
            .then(response => {
                props.setWorkouts(response.data)
            })
            .catch(error => {
                console.error("Error fetching workouts", error)
            })
    }

    useEffect(fetchWorkouts, []);
    if (!props.workouts) {
        return "Loading..."
    }
    return (
        <div className={"homepage"} >
            <h1>Workouts</h1>
            <ul>
                {props.workouts.map(workout => (
                    <li key={workout.id}>
                        <Link to={`/workouts/${workout.id}`}>
                            {workout.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}