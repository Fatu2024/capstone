import { Link } from "react-router-dom"

export default function Nav () {
    return (
        <div className="nav">
            <Link to='/'>
            <div>welcome</div>
            </Link>

            <Link to='/signin'>
                <div>sign in page</div>
            </Link>

            <Link to='/calendar'>
                <div>calendar entries</div>
            </Link>

            <Link to='/journal'>
                <div>journal entries</div>
            </Link>
        </div>
    )
}