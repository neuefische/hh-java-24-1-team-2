import {Link} from "react-router-dom";
import {MdHome} from "react-icons/md";
import { GrAdd } from "react-icons/gr";

export default function Navigation() {
    return (
        <>
            <nav className="nav">
                <ul className="ul"
                    style={{display: 'flex', justifyContent: 'space-between', listStyleType: 'none', padding: 0,margin: '0 60px'}}>
                    <li className="icon-style" style={{display: 'flex', alignItems: 'center'}}>
                        <Link to={"/"}>
                            <MdHome style={{verticalAlign: 'top', marginRight: '6px'}}/>Home
                        </Link>
                    </li>
                    <li style={{fontSize: "40px",fontWeight: "bold", display: 'flex', alignItems: 'center'}}>
                        Fitness Freaks
                    </li>
                    <li style={{display: 'flex', alignItems: 'center'}}>
                        <Link to={"/workouts/add"}>
                            <GrAdd style={{verticalAlign: 'top', marginRight: '6px'}}/>Add Workout
                        </Link>
                    </li>

                </ul>
            </nav>
        </>
    )
}