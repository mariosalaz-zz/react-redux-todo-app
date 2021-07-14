import { applyMiddleware, createStore } from "redux";
import ReduxThunk from 'redux-thunk'; // no changes here 😀

import rootReducer from "../redux/todo/rootReducer";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;