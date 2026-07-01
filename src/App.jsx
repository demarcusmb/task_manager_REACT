import { useState, useEffect } from 'react'
import './App.css'
import {getTasks} from "./services/taskService.js";

function App() {
  // tasks stores all tasks returned from api
  const [tasks, setTasks] = useState([]);
  // editingTask stores the task currently being edited
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async() => {
    const response = await getTasks();
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);
}

export default App
