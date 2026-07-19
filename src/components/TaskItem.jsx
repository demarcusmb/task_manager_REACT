/*
    Flow of edit:
    User clicks Edit
    onEdit( task ) is called
    Parent stores task in editingTask
    TaskForm updates automatically

    Flow of delete:
    User clicks Delete
    onDelete( task.id ) is called
    Parent sends DELETE request to API
    Task is removed from state

*/
export default function TaskItem({ task, onEdit, onDelete }) {
// tasks is the object to display
// onEdit function triggers edit mode
// onDelete function deletes task

    return (
        <div className= "task-item" >
            <span>{ task.title }</span>
            <span>{ task.description }</span>

            <div className="actions">
                <button onClick={() => onEdit( task )}>
                    Edit
                </button>

                <button onClick={() => onDelete( task._id )}>
                    Delete
                </button>
            </div>
        </div>
    )
}