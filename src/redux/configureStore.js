import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import posts from "./features/posts";
import comments from "./features/comments";


export const store = createStore(
    combineReducers({
        posts,
        comments
    }),
    composeWithDevTools(applyMiddleware(thunk))
);