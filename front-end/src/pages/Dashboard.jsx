import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ToDoForm from "../components/ToDoForm";
import Spinner from '../components/Spinner';
import { getToDos, reset } from "../features/to-dos/todoSlice";
import ToDoItem from "../components/ToDoItem";

function Dashboard() {

    //initialize our navigate so we can redirect user
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //get the user from state.auth
    const { user } = useSelector((state) => state.auth)

    //get the to dos
    const { todos, isLoading, isError, message } = useSelector((state) => state.todos)

    //create useEffect so someone can't see the dashboard if not logged in
    useEffect(() => {
        //check for an error
        if (isError) {
            console.log(message)
        }
        //only fetch to dos if the user is logged in else take them to the login page 
        if (user) {
            dispatch(getToDos())
        } else {
            navigate('/login')
        }
        //clear to dos when we leave the dashboard
        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="dashbd">
                <section className="heading">
                    {/* display their username if logged in */}
                    <h1>Welcome back {user && user.username}!</h1>
                    <p>Daily Dashboard</p>
                </section>

                <ToDoForm />

                {/* show our to dos on the screen */}
                <section className="content">
                    {todos.length > 0 ? (
                        <div className="todos">
                            {todos.map((todo) => (
                                <ToDoItem key={todo._id} todo={todo} />
                            ))}
                        </div>
                    ) : (<h3>you have not set any to dos</h3>)}
                </section>
            </div>
        </>
    )
}

export default Dashboard;
