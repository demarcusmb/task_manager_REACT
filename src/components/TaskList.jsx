import TaskItem from "./TaskItem.jsx";

/*
    Flow of component:
    App.jsx holds state
    TaskList receieves tasks
    TaskItem displays each task
    Actions bubble back up
 */
export default function TaskList({ tasks, onEdit, onDelete }) {
    // tasks is an array of task objects
    // onEdit function edits a task
    // onDelete function deletes a task

    // Check if there are no tasks
    if( !tasks || tasks.length === 0 ) {
        return <p>No tasks available.</p>;
    }

    // Loops through the tasks array using .map()
    // .map() functions transforms an array into UI elements
    return(
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                /* keys track list items,
                improve rendering performance,
                prevents UI bugs when items change
                 */
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                />
            ))}
        </div>
    )
}