import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./Todo.css";
import { COLOR_SELECTED, TODO_DELETED, TODO_TOGGLED } from "../../redux/todo/todoTypes";

const Todo = ({id, text, dispatchAction, completed, color}) => {
    const [colorSelected, setColorSelected] = useState("")
    const colors = ["green", "blue", "orange", "purple", "red"];

    return ( 
        <div className="todo-container">
            <div className="todo-info">
                <input type="checkbox" checked={completed ? completed : false} className="form-check-input" onChange={ e => dispatchAction(e, TODO_TOGGLED, id)}/>
                <p>{text}</p>
            </div>
            <div className="todo-options">
                <select name="color" className={`form-select ${color ? color : colorSelected}`} value={color} onChange={(e) => {
                    setColorSelected(e.target.value);
                    dispatchAction(e, COLOR_SELECTED, {todoId: id, color: e.target.value});
                }}>
                    <option value=""></option>
                    {colors.map(color => 
                        <option
                            key={color}
                            className={color} 
                            value={color}>{color}
                        </option>
                    )}
                </select>
                <FontAwesomeIcon className="todo-delete" icon="times" onClick={e => dispatchAction(e, TODO_DELETED, id)}/>
            </div>
        </div>
    );
}
 
export default Todo;