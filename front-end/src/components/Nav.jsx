import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaSignOutAlt } from 'react-icons/fa';

function Nav() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //access the user from the Redux state
    const { user } = useSelector((state) => state.auth);

    //define the logout function
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

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

            {/* conditional rendering */}

            {user && (
                <Link to='/calendar'>
                    <div>Calendar</div>
                </Link>
            )}

            {user && (
                <button className='logout-btn' onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            )}
        </div>

    );
}

export default Nav;