import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaCheck } from 'react-icons/fa';

const ToDoItem = () => {
    //state for to-do items
    const [todoList, setTodoList] = useState([]);
    //state for new to-do item
    const [newTodo, setNewTodo] = useState('');
    //state for editing a to-do item
    const [editTodo, setEditTodo] = useState(null);
    //state for top 3 to-do items
    const [top3List, setTop3List] = useState([]);

    //function to handle adding a new to-do item
    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            setTodoList([...todoList, { id: Date.now(), text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    //function to handle editing a to-do item
    const handleEditTodo = (id, newText) => {
        const updatedList = todoList.map(item =>
            item.id === id ? { ...item, text: newText } : item
        );
        setTodoList(updatedList);
        setEditTodo(null);
    };

    //function to handle marking a to-do item as completed
    const handleToggleComplete = id => {
        const updatedList = todoList.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setTodoList(updatedList);
    };

    //function to handle deleting a to-do item
    const handleDeleteTodo = id => {
        const updatedList = todoList.filter(item => item.id !== id);
        setTodoList(updatedList);
    };

    //function to handle adding a to-do item to top 3
    const handleAddToTop3 = id => {
        const selectedTodo = todoList.find(item => item.id === id);
        if (selectedTodo && top3List.length < 3) {
            setTop3List([...top3List, selectedTodo]);
        }
    };

    return (
        <div className="calendar-container">
            <div className="todo-list">
                <h2>To-Do List</h2>
                <ul>
                    {todoList.map(item => (
                        <li key={item.id}>
                            <span
                                className={item.completed ? 'completed' : ''}
                                onClick={() => handleToggleComplete(item.id)}
                            >
                                {item.text}
                            </span>
                            <div className="todo-actions">
                                <FaEdit onClick={() => setEditTodo(item.id)} />
                                <FaTrashAlt onClick={() => handleDeleteTodo(item.id)} />
                                {!top3List.find(todo => todo.id === item.id) && (
                                    <FaPlus onClick={() => handleAddToTop3(item.id)} />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={newTodo}
                    onChange={e => setNewTodo(e.target.value)}
                    placeholder="Add new to-do..."
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>

            <div className="top3-list">
                <h2>Top 3</h2>
                <ul>
                    {top3List.map(item => (
                        <li key={item.id}>
                            {item.text}{' '}
                            <FaCheck
                                className={item.completed ? 'completed' : ''}
                                onClick={() => handleToggleComplete(item.id)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoItem;
