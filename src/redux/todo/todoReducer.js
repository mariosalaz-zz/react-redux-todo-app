import { 
    ALL_COMPLETED, 
    COLOR_SELECTED, 
    COMPLETED_CLEARED, 
    TODO_ADDED, 
    TODO_DELETED, 
    TODO_TOGGLED,
    COLOR_FILTER_CHANGED,
    STATUS_FILTER_CHANGED, 
    COLOR_FILTER_SELECTED,
    FETCH_TODOS_REQUEST} from "./todoTypes";

const initialState = {
    todos: [],
    filters: {
        status: 'all',
        colors: [],
        filteredTodos: [],
        isFilterSelected: false
    }
}

const nextTodoId = (todos) => {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

const todoReducer = (state = initialState, action) => {
    const isFilterSelected = state.filters.isFilterSelected;
    switch (action.type) {
        case FETCH_TODOS_REQUEST: return {
            ...state,
            todos: action.payload
        }

        case TODO_ADDED: return {
            ...state,
            todos: [
                ...state.todos,
                {
                    id: nextTodoId(state.todos),
                    text: action.payload
                }
            ]
        }

        case TODO_TOGGLED: return {
            ...state,
            todos: state.todos.map(todo => {
                if(todo.id !== action.payload) {
                    return todo
                }

                return {
                    ...todo,
                    completed: !todo.completed
                }
            })
        }

        case TODO_DELETED: return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.payload),
            filters: {
                ...state.filters,
                filteredTodos: state.filters.filteredTodos ? 
                    state.filters.filteredTodos.filter(todo => todo.id !== action.payload) : []
            }
        }

        case ALL_COMPLETED: return {
            ...state,
            todos: state.todos.map(todo => {
                return {
                    ...todo,
                    completed: true
                }
            })
        }

        case COMPLETED_CLEARED: return {
            ...state,
            todos: state.todos.filter(todo => !todo.completed)
        }

        case COLOR_SELECTED: return {
            ...state,
            todos: state.todos.map(todo => {
                if(todo.id !== action.payload.todoId){
                    return todo
                }

                return {
                    ...todo,
                    color: action.payload.color
                }
            })
        }

        case COLOR_FILTER_CHANGED: 
            let colorsSelected = [...state.filters.colors];

            if (action.payload.changeType) {
                !colorsSelected.includes(action.payload.color) && colorsSelected.push(action.payload.color);
            } else {
                colorsSelected = colorsSelected.filter(color => color !== action.payload.color)
            }

            return {
                ...state,
                filters: {
                    ...state.filters,
                    colors: colorsSelected,
                    filteredTodos: state.todos.filter(todo => colorsSelected.includes(todo.color))
                }
            }

        case COLOR_FILTER_SELECTED: return {
            ...state,
            filters: {
                ...state.filters,
                isFilterSelected: action.payload
            }
        }

        case STATUS_FILTER_CHANGED: 
            switch (action.payload) {
                case 'all': return {
                    ...state,
                    filters: {
                        ...state.filters,
                        status: action.payload,
                        filteredTodos: [],
                        isFilterSelected: false
                    }
                }
                
                case 'active': 
                    if (isFilterSelected) {
                        return {
                            ...state,
                            filters: {
                                ...state.filters,
                                status: action.payload,
                                filteredTodos: state.filters.filteredTodos.filter(todo => !todo.completed)
                            }
                        }
                    } else {
                        return {
                            ...state,
                            filters: {
                                ...state.filters,
                                status: action.payload,
                                filteredTodos: state.todos.filter(todo => !todo.completed),
                                isFilterSelected: true
                            }
                        }
                    }

                case 'completed': 
                    if (isFilterSelected) {
                        return {
                            ...state,
                            filters: {
                                ...state.filters,
                                status: action.payload,
                                filteredTodos: state.filters.filteredTodos.filter(todo => todo.completed),
                                isFilterSelected: true

                            }
                        }
                    } else {
                        return {
                            ...state,
                            filters: {
                                ...state.filters,
                                status: action.payload,
                                filteredTodos: state.todos.filter(todo => todo.completed),
                                isFilterSelected: true
                            }
                        }
                    }
            
                default: return state
            }
    
        default: return state
    }
}

export default todoReducer;