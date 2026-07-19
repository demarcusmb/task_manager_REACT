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
    const [ description, setDescription] = useState("");
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
    // Prevents empty submission
    // Sends data to App.jsx
    // Clears input after submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if(!title.trim() || !description.trim()) return;

        onSubmit(title, description);

        setTitle("");
    };

    return(
        <form onSubmit={ handleSubmit } className="task-form">
            <input
            type="text"
            value={ title }
            onChange={ e => setTitle(e.target.value) }
            placeholder="Enter task..."
            />

            <input
                type="text"
                value={ description }
                onChange={ e => setDescription(e.target.value) }
                placeholder="Enter Description..."
            />

            <button type="submit">
                { editingTask ? "Update Task" : "Add Task" }
            </button>
        </form>
    );
}