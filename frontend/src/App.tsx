import './App.css'
import Header from "./components/layout/Header.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AddWorkoutPage from "./pages/AddWorkoutPage.tsx";
import EditWorkoutPage from "./pages/EditWorkoutPage.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";
import {useState} from "react";
import {Workout} from "./types/Workout.ts";

function Footer() {
    return null;
}

export default function App() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);


    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/workouts/:id" element={<DetailsPage/>}/>
                <Route path="/workouts/add" element={<AddWorkoutPage/>}/>
                <Route path="/workouts/:id/edit" element={<EditWorkoutPage/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}


