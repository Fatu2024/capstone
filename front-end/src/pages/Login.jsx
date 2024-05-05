import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {login, reset} from '../features/auth/authSlice';
import { FaSignInAlt } from 'react-icons/fa';
import Spinner from '../components/Spinner';

function Login() {

    //our state for the form.
    //setting the default to empty strings
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    //destructure the fields from the form data
    const { email, password } = formData;

    //initialize navigate and dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

     //use useEffect to watch for changes in state
    useEffect(() => {
        //check for an error
        if (isError) {
            toast.error(message)
        }

        //if sucessful, navigate to the dashboard linked at '/'
        if (isSuccess || user) {
            navigate('/dashboard')
        }

        //reset the state to initialState after we've checked it
        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch]);


    // 4. onChange f(x)
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    //5. onSubmit f(x)
    const onSubmit = (e) => {
        e.preventDefault();

        //dispatch login function and pass in the user data.
        //validating the user in the back-end
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    //check if its loading
    if (isLoading) {
        return <Spinner />
    }

    //3.
    return (
        <>
            <section className="heading">
                <h1>
                    {/* bring in an icon */}
                    <FaSignInAlt /> Login
                </h1>

                <p>login and start setting goals</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>

                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id='email'
                            name='email'
                            value={email}
                            placeholder='enter your email'
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id='password'
                            name='password'
                            value={password}
                            placeholder='enter password'
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>

                </form>
            </section>
        </>
    )
}

export default Login;
