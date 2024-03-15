import Navigation from "./Navigation.tsx";
import "./Header.css"

type HeaderProps={
    user:string | undefined | null
}
export default function Header(props: Readonly<HeaderProps>) {
    return (
            <header>
                <Navigation user={props.user}/>
            </header>
    )
}