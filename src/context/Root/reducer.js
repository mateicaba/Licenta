import produce from "immer";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SET_LOADER = "SET_LOADER";
export const UNSET_LOADER = "UNSET_LOADER";
export const FETCH_CURRENT_USER = "FETCH_CURRENT_USER";

export const initialState = {
  user: null,
  isLoading: false,
  error: "",
};

export default (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        draft.error = "";
        draft.user = action.payload;
        break;
      case LOGIN_FAILED:
        draft.user = null;
        draft.error = action.payload;
        break;
      case LOGIN_REQUEST:
        draft.isLoading = true;
        draft.error = '';
        break;  
      case SET_LOADER:
        draft.isLoading = true;
        break;
      case UNSET_LOADER:
        draft.isLoading = false;
        break;
      default:
        break;
    }
  });
