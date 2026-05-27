export interface TodoProps {
    id: string;
    title: string;
    creationTimestamp: string;
}

const Todo: React.FC<TodoProps & {
    onDelete(id: string): void;
}> = props => {
    return <div className="todo">
        <p className="title">{props.title}</p>
        
        <button
            className="delete-btn"
            onClick={() => props.onDelete(props.id)}
        >Delete</button>
    </div>
}

export default Todo;