import { Link } from "react-router-dom";

export default function Nav () {
    return (
        <div className="nav">
            <Link to='/'>
            <div>Home</div>
            </Link>

            <Link to='/howitworks'>
                <div>How It Works</div>
            </Link>

            <Link to='/aboutus'>
                <div>About Us</div>
            </Link>
        </div>
    )
}