import './App.css'
import Header from "./components/layout/Header.tsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import AddWorkoutPage from "./pages/AddWorkoutPage.tsx";
import EditWorkoutPage from "./pages/EditWorkoutPage.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";
import {useEffect, useState} from "react";
import {Workout} from "./types/Workout.ts";
import Footer from "./components/layout/Footer.tsx";
import axios from "axios";
import GenerateWorkoutPage from "./pages/GenerateWorkoutPage.tsx";

export default function App() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    function fetchData(){
        axios.get("/api/workouts")
            .then(response=>setWorkouts(response.data))
            .catch(error => {
            console.error("Error fetching workouts", error)
        })
    }

    useEffect(fetchData, []);
    if (!workouts) {
        return "Loading..."
    }

    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage workouts={workouts} setWorkouts={setWorkouts}/>}/>
                <Route path="/workouts/:id" element={<DetailsPage workouts={workouts} fetchData={fetchData}/>}/>
                <Route path="/workouts/add" element={<AddWorkoutPage/>}/>
                <Route path="/workouts/:id/edit" element={<EditWorkoutPage workouts={workouts} fetchData={fetchData}/>} />
                <Route path="/workouts/generate" element={<GenerateWorkoutPage/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}


