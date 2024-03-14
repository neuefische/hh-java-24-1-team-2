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
import ProtectedRoutes from "./ProtectedRoutes.tsx";

export default function App() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    const [user, setUser] = useState<string | undefined | null>(undefined);

    useEffect(() => {
        loadUser()
    }, [])
    function fetchData(){
        axios.get("/api/workouts")
            .then(response=> setWorkouts(response.data))
            .catch(error => {
            console.error("Error fetching workouts", error)
        })
    }

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.host

        window.open(host + '/oauth2/authorization/github', '_self')
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin

        window.open(host + '/logout', '_self')
    }

    const loadUser = () => {
        axios.get('/api/auth/me')
            .then(response => {
                setUser(response.data)
            })
            .catch(() => {
                setUser(null)
            })
    }

    useEffect(fetchData, []);
    if (!workouts) {
        return "Loading..."
    }

    return (
        <div  className={"mainPage"}>
            <Header/>
            <div className={"login"}>
                {user === null && <button onClick={login}>Login</button>}
            {user !== null && <p>Hallo {user}</p>}
            {user !== null && <button onClick={logout}>Logout</button>}
            </div>
            <Routes>
                <Route path="/" element={<HomePage workouts={workouts} setWorkouts={setWorkouts}/>}/>
                <Route element={<ProtectedRoutes user={user} />}>
                    <Route path="/workouts/:id" element={<DetailsPage workouts={workouts} fetchData={fetchData}/>}/>
                    <Route path="/workouts/add" element={<AddWorkoutPage workouts={workouts} fetchData={fetchData}/>}/>
                    <Route path="/workouts/:id/edit" element={<EditWorkoutPage workouts={workouts} fetchData={fetchData}/>} />
                    <Route path="/workouts/generate" element={<GenerateWorkoutPage fetchData={fetchData}/>}/>
                </Route>
            </Routes>
            <Footer/>
        </div>
    )
}


