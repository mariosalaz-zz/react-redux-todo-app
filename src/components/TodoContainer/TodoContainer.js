import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../todo/Todo";
import Actions from "../actions/Actions";
import Status from "../status/Status";
import Colors from "../colors/Colors";

import "./TodoContainer.css";
import { TODO_ADDED } from "../../redux/todo/todoTypes";
import { fetchTodos } from "../../redux/todo/todoActions";

const TodoContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const [todo, setTodo] = useState("");
    const todosState = useSelector(state => state.todos);
    const dispatchAction = (e, action, payload) => {
        if (action === TODO_ADDED) {
            if (e.keyCode === 13) {
                dispatch({type: action, payload})
                setTodo("");
            } else {
                return;  
            }

        } else {
            dispatch({type: action, payload})
        }
    }

    
    const todosList = todosState.filters.filteredTodos.length > 0 || todosState.filters.isFilterSelected ?
    todosState.filters.filteredTodos : todosState.todos;
    
    return ( 
        <div className="card main-container">
            <main>
                <section className="main-container__input">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="What needs to be done?" 
                        value={todo}
                        onChange={e => setTodo(e.target.value)}
                        onKeyDown={e => dispatchAction(e, TODO_ADDED, todo)}/>
                </section>
                <section>
                    <ul className="list-group main-list">
                        {todosList.length > 0 && todosList.map(todo => {
                            return <li key={todo.id} className="list-group-item"><Todo {...todo} dispatchAction={dispatchAction}/></li>
                        })}
                    </ul>
                </section>
                <section className="main-container__menu">
                    <div className="actions-menu">
                        <Actions dispatchAction={dispatchAction}/>
                    </div>
                    <div className="remaining-todos">
                        <h3>Remaining Todos</h3>
                        <p>{`${todosList.length} ${todosList.length > 1 ? 'items' : 'item'}`}</p>
                    </div>
                    <div>
                        <Status dispatchAction={dispatchAction}/>
                    </div>
                    <div>
                        <Colors dispatchAction={dispatchAction}/>
                    </div>
                </section>
            </main>
        </div>
     );
}
 
export default TodoContainer;