import './App.css'
import {useState} from 'react'

import UserRegister from "./components/UserRegister.jsx";
import UserLogin from "./components/UserLogin.jsx";
import {userLogin, userRegister} from "./services/userService.js";

import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import {createTask, deleteTask, getTasks, updateTask,} from "./services/taskService.js";

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
  // gets jwt token
  const [token, setToken] = useState(localStorage.getItem("token"));
  // allows swap between register and login page
  const [showLogin, setShowLogin] = useState(true);

  const handleRegister = async ( userName, password, email ) => {
    try{
      setError("");
      await userRegister({
        userName, password, email
      });

      const data = await userLogin({
        userName, password
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      await fetchTasks();
    } catch (error) {
      setError("Failed to register." + error)
    }
  }

  const handleLogin = async ( userName, password) => {
    try {
      setError("");
      const data = await userLogin({
        userName,
        password,
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      await fetchTasks();
      console.log("Logged in!");
    } catch (error) {
      setError(
          error.response?.data?.message || "Login failed."
      );
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setTasks([]);
  };

  // Fetches tasks from the backend
  const fetchTasks = async() => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError("Failed to load tasks." + error)
    } finally {
      setLoading(false);
    }
  };


  // Sends new tasks to the backend
  const handleCreateTask = async (title) => {
    try{
      const newTask = await createTask({ title });
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      setError("Failed to create task." + error);
    }
  };

  // Delete task from backend
  const handleDeleteTask = async (id) => {
    try {
      setError("");
      await deleteTask(id);

      setTasks((prev) =>
      prev.filter((task) => task._id !== id)
      );
    } catch (error) {
      setError("Failed to delete task." + error);
    }
  };

  // Edits a task in the backend
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Updates a task from the backend
  const handleUpdateTask = async (title) => {
    try {
      setError("");
      const updatedTask = await updateTask(editingTask._id, {
        title,
      });

      setTasks((prev) =>
        prev.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
        )
      );

      setEditingTask(null);
    } catch (error) {
      setError("Failed to update task." + error);
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
        {error && <p className="error">{error}</p>}
        {!token ? (
            <>
              {showLogin ? (
                  <>
                    <UserLogin onSubmit={handleLogin} />

                    <p>
                      Don't have an account?
                    </p>

                    <button
                        type="button"

                        onClick={() => { setShowLogin(false);  setError("");} }
                    >
                      Register
                    </button>
                  </>
              ) : (
                  <>
                    <UserRegister onSubmit={handleRegister} />

                    <p>
                      Already have an account?
                    </p>

                    <button
                        type="button"
                        onClick={() => setShowLogin(true)}
                    >
                      Login
                    </button>
                  </>
              )}
            </>
        ) : (
            <>
              <TaskForm
                  onSubmit={handleSubmit}
                  editingTask={editingTask}
              />

              <TaskList
                  tasks={tasks}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
              />

              <button onClick={() => {handleLogout(); setShowLogin(true);} }>
                Logout
              </button>
            </>
        )}

      </div>
  );

}