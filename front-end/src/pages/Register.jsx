import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';

function Register() {

    //setting our state for the data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    //destructuring the fields from the form data
    const { username, email, password, password2 } = formData

    //initialize navigate, dispatch, and useSelector
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    //use useEffect to watch for changes in state 
    useEffect(() => {
        //check for an error
        if (isError) {
            toast.error(message)
        }

        //if sucessful orif user is logged in, navigate to the dashboard linked at '/'
        if (isSuccess || user) {
            navigate('/')
        }

        //reset the state after we've checked it
        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch]);

    // 4. onChange f(x)
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    //onSubmit f(x)
    const onSubmit = (e) => {
        e.preventDefault();

        //this is where we dispatch our register.
        //check if our 2 passwords match when registering:
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }

            //dispatch the register f(x) and pass in the user data
            dispatch(register(userData));
        }
    }

    //check for isLoading
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="nav">
                <h1>
                    {/* bring in an icon */}
                    <FaUser /> Register
                </h1>

                <p>please create an accout</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id='username'
                            name='username'
                            value={username}
                            placeholder='enter your username'
                            onChange={onChange}
                        />
                    </div>

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
                        <input
                            type="password"
                            className="form-control"
                            id='password2'
                            name='password2'
                            value={password2}
                            placeholder='confirm password'
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>

                    <div className="login-link">
                        <Link to="/login">Already have an account?</Link> {/* This is the hyperlink */}
                    </div>

                </form>
            </section>
        </>
    )
}

export default Register 
