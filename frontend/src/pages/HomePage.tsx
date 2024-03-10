import {Workout} from "../types/Workout.ts";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

type HomePageProps = {
    workouts: Workout[]
    setWorkouts: (workouts: Workout[]) => void
}

export default function HomePage(props: Readonly<HomePageProps>) {
const [search, setSearch]=useState<string>("");

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

    function handleSearchInput(e: ChangeEvent<HTMLInputElement>){
        const value = e.target.value;
        setSearch(value);
    }

    const filteredWorkouts=props.workouts.filter(workout=> workout.name.includes(search) || workout.categories.toString().includes(search) || workout.muscleGroups.toString().includes(search));


    return (
        <div className={"homepage"} >
            <h1>Workouts</h1>
            <label>
                Search for:
            <input type={"text"} value={search} onChange={handleSearchInput}/>
            </label>
            <ul>
                {filteredWorkouts.map(workout => (
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