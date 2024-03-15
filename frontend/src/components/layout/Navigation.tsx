import {Link, useNavigate} from "react-router-dom";
import {MdHome} from "react-icons/md";
import "./Navigation.css";
import {Button, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import {PostAdd} from "@mui/icons-material";
import Login from "../Login.tsx";

type NavigationProps={
    user: string | undefined | null
}
export default function Navigation(props: Readonly<NavigationProps>) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate=useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <nav className="nav">
                <ul>
                    <li className="icon-place">
                        <li className={"icon-place home"}>
                            <Link to={"/"}>
                            <MdHome className="icon"/>Home
                            </Link>
                        </li>
                        <li className={"icon-place add-area"}>
                            <Button onClick={handleClick} startIcon={<PostAdd/>}>Add workout</Button>
                                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                    <MenuItem onClick={() => navigate("/workouts/add")}>manually</MenuItem>
                                    <MenuItem onClick={() => navigate("/workouts/generate")}>generate randomly</MenuItem>
                                </Menu>
                        </li>
                    </li>
                    <li className="title">
                        Fitness Freaks
                    </li>

                    <li className="icon-place">
                        <Login user={props.user}/>
                    </li>

                </ul>
            </nav>
        </>
    )
}