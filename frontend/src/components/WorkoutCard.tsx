import {Link} from "react-router-dom";
import {Workout} from "../types/Workout.ts";
import {Card, Chip} from "@mui/material";
import "./WorkoutCard.css"

type WorkoutCardProps={
    workout: Workout
}
export default function WorkoutCard(props: Readonly<WorkoutCardProps>){
    return(
        <Card className={"workoutCard"}>
            <Link to={`/workouts/${props.workout.id}`}>
                <h3>{props.workout.name}</h3>
                <p>Categories: {props.workout.categories.map(category => <Chip key={category} label={category} size={"small"}/>)}</p>
                <p>Muscles: {props.workout.muscleGroups.map(muscle => <Chip key={muscle} label={muscle} size={"small"}/>)}</p>
            </Link>
        </Card>
    )
}
