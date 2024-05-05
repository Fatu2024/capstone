import { useDispatch } from "react-redux";
import {deleteToDo} from '../features/to-dos/todoSlice'

function ToDoItem({todo}) {

    const dispatch = useDispatch();

    return (
        <div className="todo">
            <div>
                {new Date(todo.createdAt).toLocaleDateString('en-us')}
            </div>

            <h2>{todo.text}</h2>
            
            {/* create a button to remove to do items */}
            <button onClick={() => dispatch(deleteToDo(todo._id))} className="close">x</button>
        </div>
    )
}

export default ToDoItem
