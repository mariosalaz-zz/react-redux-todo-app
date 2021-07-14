import axios from 'axios';

import { 
    ALL_COMPLETED, 
    COLOR_FILTER_CHANGED, 
    COLOR_FILTER_SELECTED, 
    COLOR_SELECTED, 
    COMPLETED_CLEARED, 
    FETCH_TODOS_REQUEST, 
    STATUS_FILTER_CHANGED, 
    TODO_ADDED, 
    TODO_DELETED, 
    TODO_TOGGLED } from "./todoTypes";

export const todoAdded = todoText => {
    return {
        type: TODO_ADDED,
        payload: todoText
    }
};

export const todoToggled = todoId => {
    return {
        type: TODO_TOGGLED,
        payload: todoId
    }
}

export const colorSelected = (todoId, color) => {
    return {
        type: COLOR_SELECTED,
        payload: {todoId, color}
    }
}

export const todoDeleted = todoId => {
    return {
        type: TODO_DELETED,
        payload: todoId
    }
}

export const allCompleted = () => {
    return {
        type: ALL_COMPLETED
    }
}

export const completedCleared = () => {
    return {
        type: COMPLETED_CLEARED
    }
}

export const statusFilterChanged = filterValue => {
    return {
        type: STATUS_FILTER_CHANGED,
        payload: filterValue
    }
}

export const colorFilterChanged = (color, changeType) => {
    return {
        type: COLOR_FILTER_CHANGED,
        payload: {color, changeType}
    }
}

export const colorFilterSelected = (isSelected) => {
    return {
        type: COLOR_FILTER_SELECTED,
        payload: isSelected
    }
}

export const fetchTodosRequest = (todos) => {
    return {
        type: FETCH_TODOS_REQUEST,
        payload: todos
    }
}

export const fetchTodos = () => {
    return async function(dispatch) {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
            const todos = await response.data.map(todo => {
                return {
                    id: todo.id,
                    text: todo.title,
                    completed: todo.completed
                }
            });
            dispatch(fetchTodosRequest(todos));
        } catch (error) {
           console.log(error) 
        }
    }
}

