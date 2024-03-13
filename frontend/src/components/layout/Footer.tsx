import {Copyright} from "@mui/icons-material";
import "./Footer.css";

export default function Footer(){
    return (
        <footer className={"foot"}>
            <ul>
                <Copyright/>&nbsp;
                <li>Reebal Sami</li>
                <li>Aaron Becher</li>
                <li>Jessica Zarnowski</li>
                <li>Betül Ezgü</li>
            </ul>
        </footer>
    )
}