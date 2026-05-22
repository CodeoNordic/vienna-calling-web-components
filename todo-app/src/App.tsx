import { useCallback, useEffect, useRef, useState } from 'react';
import createMethod from '@hooks/createMethod';

import Todo, { type TodoProps } from '@components/Todo';

interface Config {
    todos: Array<TodoProps>;
    scripts: {
        createTodo: string;
        deleteTodo: string;
    }
}

const App = () => {
    const [todos, setTodos] = useState<Array<TodoProps>>([]);
    const [scripts, setScripts] = useState<Config['scripts']|undefined>();

    const titleInput = useRef<HTMLInputElement|null>(null);

    createMethod('init', (cfg: Config) => {
        // Set a global _config variable for debugging purposes
        (window as RSAny)._config = cfg;

        // Update React states
        setTodos(cfg.todos);
        setScripts(cfg.scripts);
    });

    createMethod('todoCreated', (todo: TodoProps) => {
        // Add the todo to the top of the list
        setTodos(prev => [todo, ...prev]);
    });

    createMethod('todoDeleted', (id: string) => {
        // Filter the current todos to remove the deleted one
        setTodos(prev => prev.filter(todo => todo.id !== id));
    });

    const onCreate = useCallback(() => {
        if (!titleInput.current?.value) return;

        // Send the todo to FileMaker for record creation
        window.FileMaker.PerformScript(scripts!.createTodo, JSON.stringify({
            title: titleInput.current.value
        }));

        titleInput.current.value = '';
    }, [scripts?.createTodo, titleInput]);

    const onDelete = useCallback((todoId: string) => {
        window.FileMaker.PerformScript(scripts!.deleteTodo, todoId);
    }, [scripts?.deleteTodo]);

    // Show "Loading..." if scripts haven't been passed yet
    if (!scripts) return <h1>Loading...</h1>

    return <>
        <h1>Todo App</h1>

        <div className="create">
            <input
                ref={titleInput}
                id="title-input"
                type="text"
                placeholder="Finish homework..."
                onKeyDown={e => {
                    if (e.key === 'Enter' && e.currentTarget.value)
                        onCreate();
                }}
            />

            <button
                className="create-btn"
                onClick={onCreate}
            >Create</button>
        </div>

        <div className="todos">
            {todos.map(props => <Todo
                {...props}
                key={props.id}
                onDelete={onDelete}
            />)}
        </div>
    </>
}

export default App;