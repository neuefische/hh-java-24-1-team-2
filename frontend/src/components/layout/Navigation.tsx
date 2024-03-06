import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to={"/"} >Home</Link></li>
                    <li><Link to={"/workouts/add"} >Add Workout</Link></li>

                </ul>
            </nav>
        </>
    )
}