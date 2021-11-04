const initialState = {
  loading: false,
  items: [],
  error: null,
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case "get/posts/pending":
      return {
        ...state,
        loading: true,
      };
    case "get/posts/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case "get/posts/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "create/posts/pending":
      return {
        ...state,
        loading: true,
      };
    case "create/posts/fulfilled":
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case "create/posts/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "remove/post/pending":
      return {
        ...state,
        loading: true,
      };
    case "remove/post/fulfilled":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case "remove/post/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "edit/post/pending":
      return {
        ...state,
        loading: true,
      };
    case "edit/post/fulfilled":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.payload.id) {
            return item;
          }
          return action.payload;
        }),
        loading: false,
      };
    case "edit/post/rejected":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: "get/posts/pending" });
    try {
      const response = await fetch("/posts", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      console.log(json);
      if (json.error) {
        dispatch({
          type: "get/posts/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "get/posts/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "get/posts/rejected", error: e.toString() });
    }
  };
};

export const createPosts = (title, body) => {
  return async (dispatch) => {
    dispatch({ type: "create/posts/pending" });
    try {
      const response = await fetch("/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title,
          body,
        }),
      });

      const json = await response.json();

      if (json.error) {
        dispatch({
          type: "create/posts/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "create/posts/fulfilled", payload: json });
      }
    } catch (e) {
      dispatch({ type: "create/posts/rejected", error: e.toString() });
    }
  };
};

export const removePost = (id) => {
  return async (dispatch) => {
    dispatch({ type: "remove/post/pending" });
    try {
      const response = await fetch(`/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      if (json.error) {
        dispatch({
          type: "remove/post/rejected",
          error: "При запросе на сервер произошла ошибка",
        });
      } else {
        dispatch({ type: "remove/post/fulfilled", payload: id });
      }
    } catch (e) {
      dispatch({ type: "remove/post/rejected", error: e.toString() });
    }
  };
};

export const editPost = (id, title, body) => {
  return async (dispatch) => {
    dispatch({
      type: "edit/post/pending",
    });
    const response = await fetch(`/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();
    if (json.error) {
      dispatch({
        type: "edit/post/rejected",
        payload: json.error,
      });
    } else {
      dispatch({
        type: "edit/post/fulfilled",
        payload: json,
      });
    }
  };
};

