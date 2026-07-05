import './App.css'
import { useState, useEffect } from 'react'
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import {getTasks,
        createTask,
        updateTask,
        deleteTask,
} from "./services/taskService.js";

/*
  How data flows:
  App loads
  useEffe t calls getTasks()
  Tasks stored in state
  UI renders task list

  How create flows:
  User submits form
  createTask() called
  New task added to state
  UI updates instantly

  How update flows
  User clicks edits
  Task sent to form
  User edits and submits
  updateTask() runs
  State is updated
  Delete Flow
  User clicks Delete
  deleteTask() runs
  Task removed from state
*/

export default function App() {
  // tasks stores all tasks returned from api
  const [tasks, setTasks] = useState([]);
  // editingTask stores the task currently being edited
  const [editingTask, setEditingTask] = useState(null);
  // loading shows loading status
  const [loading, setLoading] = useState(false);
  // error stores error messages
  const [error, setError] = useState("");

  // Fetches tasks from the backend
  const fetchTasks = async() => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks.")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  // Sends new tasks to the backend
  const handleCreateTask = async (title) => {
    try{
      const newTask = await createTask({ title });
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError("Failed to create task.");
    }
  };

  // Delete task from backend
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);

      setTasks((prev) =>
      prev.filter((task) => task.id !== id)
      );
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  // Edits a task in the backend
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Updates a task from the backend
  const handleUpdateTask = async (title) => {
    try {
      const updatedTask = await updateTask(editingTask.id, {
        title,
      });

      setTasks((prev) =>
        prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
        )
      );

      setEditingTask(null);
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  // Sets form to be able to swap between create and update mode
  const handleSubmit = (title) => {
    if (editingTask) {
      handleUpdateTask(title);
    } else {
      handleCreateTask(title);
    }
  };

  // Building the UI
  return (
      <div className="app">
        <h1>Task Manager</h1>

        {error && <p className="error">{ error }</p>}

        {loading ? (
            <p>Loading tasks...</p>
        ) : (
            <TaskList
              tasks={ tasks }
              onEdit={ handleEditTask }
              onDelete={ handleDeleteTask }
              />
        )}

        <TaskForm
          onSubmit={ handleSubmit }
          editingTask={ editingTask }
          />
      </div>
  );

}