import { useState } from "react"
import { useDispatch } from "react-redux"
import {createToDo} from '../features/to-dos/todoSlice'

function ToDoForm() {
    //bring in state
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    //create our onSubmit function
    const onSubmit = (e) => {
        e.preventDefault()

        //dispatch our f(x) and pass in the text object
        dispatch(createToDo({text}));
        //clear the form
        setText('');
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">To Do</label>
                    <input type="text" name="text" id="text" value={text} onChange={(e)=> setText(e.target.value)}/>
                </div>

                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add To Do
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ToDoForm
