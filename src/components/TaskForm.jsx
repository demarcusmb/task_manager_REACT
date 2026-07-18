import {useEffect, useState} from "react";
/*
    Flow of component:
    User types in input
    State updates (title)
    User clicks submit
    onSubmit(title) is called
    App.jsx handles API request

    Flow when editing a task:
    User clicks "Edit"
    editingTask changes
    useEffect updates input field
    User modifies text
    Submit updates task
*/

// onSubmit is the function from App.jsx
// editingTask is the task being edited
export default function TaskForm({ onSubmit, editingTask }) {
    // onSubmit is the function from App.jsx
    // editingTask is the task being edited
    const [ title, setTitle ] = useState("");

    // If editing fill input with task title
    // if not editing clears input
    useEffect(() => {
        if(editingTask) {
            setTitle(editingTask.title);
        } else {
            setTitle("");
        }
    }, [editingTask]);

    // Prevents page reload
    // Prevents empty submissiosn
    // Sends data to App.jsx
    // Clears input after submission
    const handleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!title.trim()) return;

        onSubmit(title);

        setTitle("");
    };

    return(
        <form onSubmit={ handleSubmit } className="task-form">
            <input
            type="text"
            value={ title }
            onChange={ handleChange }
            placeholder="Enter task..."
            />

            <button type="submit">
                { editingTask ? "Update Task" : "Add Task" }
            </button>
        </form>
    );
}