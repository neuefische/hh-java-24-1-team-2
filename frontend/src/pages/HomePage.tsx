import {Workout} from "../types/Workout.ts";
import FilteredWorkouts from "../components/FilteredWorkouts.tsx";

type HomePageProps = {
    workouts: Workout[]
    setWorkouts: (workouts: Workout[]) => void
}

export default function HomePage(props: Readonly<HomePageProps>) {

    return (
        <div className={"homepage"} >
            <h1>Workouts</h1>

            <FilteredWorkouts workouts={props.workouts}/>
        </div>
    )
}