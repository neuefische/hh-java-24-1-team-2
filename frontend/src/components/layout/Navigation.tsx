import {Link} from "react-router-dom";
import {MdHome} from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import "./Navigation.css";
export default function Navigation() {
    return (
        <>
            <nav className="nav">
                <ul>
                    <li className="icon-place">
                        <Link to={"/"}>
                            <MdHome className="icon"/>Home
                        </Link>
                    </li>
                    <li className="title">
                        Fitness Freaks
                    </li>
                    <li className="icon-place">
                        <Link to={"/workouts/add"}>
                            <GrAdd className="icon"/>Add Workout
                        </Link>
                        <Link to={"/workouts/generate"}>
                            <GrAdd style={{verticalAlign: 'top', marginRight: '6px'}}/>Generate Workout
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}