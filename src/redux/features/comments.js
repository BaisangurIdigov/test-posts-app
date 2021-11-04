const initialState = {
  loading: false,
  post: [],
  comments: [],
  error: null
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case "get/postById/pending":
      return {
        ...state,
        loading: true,
      };
    case "get/postById/fulfilled":
      return {
        ...state,
        post: action.payload.posts,
        comments: action.payload.comments,
        loading: false,
      };
    case "get/postById/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "remove/comment/pending":
      return {
        ...state,
        loading: true,
      };
    case "remove/comment/fulfilled":
      return {
        ...state,
        comments: state.comments.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case "remove/comment/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "create/comment/pending":
      return {
        ...state,
        loading: true,
      };
    case "create/comment/fulfilled":
      return {
        ...state,
        comments: [...state.comments, action.payload],
        loading: false,
      };
    case "create/comment/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "edit/comment/pending":
      return {
        ...state,
        loading: true,
      };
    case "edit/comment/fulfilled":
      return {
        ...state,
        comments: state.comments.map((item) => {
          if (item.id !== action.payload.id) {
            return item;
          }
          return action.payload;
        }),
        loading: false,
      };
    case "edit/comment/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const fetchPostById = (id) => {
  return async (dispatch) => {
    dispatch({ type: "get/postById/pending" });
    try {
      const response = await fetch(`/post/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "get/postById/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "get/postById/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "get/postById/rejected", error: e.toString() });
    }
  };
};

export const removeComment = (id) => {
  return async (dispatch) => {
    dispatch({ type: "remove/comment/pending" });
    try {
      const response = await fetch(`/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "remove/comment/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "remove/comment/fulfilled", payload: id });
      }
    } catch (e) {
      dispatch({ type: "remove/comment/rejected", error: e.toString() });
    }
  };
};

export const createComment = (postId, text) => {
  console.log(postId,text)
  return async (dispatch) => {
    dispatch({ type: "create/comment/pending" });
    try {
      const response = await fetch("/comments", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          postId,
          text,
        }),
      });

      const json = await response.json();

      if (json.error) {
        dispatch({
          type: "create/comment/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "create/comment/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "create/comment/rejected", error: e.toString() });
    }
  };
};

export const editComment = (id, text) => {
  return async (dispatch) => {
    dispatch({
      type: "edit/comment/pending",
    });
    const response = await fetch(`/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({text} ),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();
    if (json.error) {
      dispatch({
        type: "edit/comment/rejected",
        payload: json.error,
      });
    } else {
      dispatch({
        type: "edit/comment/fulfilled",
        payload: json,
      });
    }
  };
};
