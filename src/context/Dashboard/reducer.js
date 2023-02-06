import produce from "immer";

export const FETCH_DASHBOARD_REQUEST = "FETCH_DASHBOARD_REQUEST";
export const FETCH_DASHBOARD_SUCCESS = "FETCH_DASHBOARD_SUCCESS";
export const FETCH_DASHBOARD_FAILED = "FETCH_DASHBOARD_FAILED";

export const initialState = {
  places: [],
  isLoading: false,
  error: "",
};

export default (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_DASHBOARD_REQUEST:
        draft.isLoading = true;
        draft.error = '';
        break;
      case FETCH_DASHBOARD_SUCCESS:
        draft.places = action.payload;
        draft.isLoading = false;
        break;
      case FETCH_DASHBOARD_FAILED:
        draft.places = [];
        draft.isLoading = false;
        draft.error = action.payload;
        break;
      default:
        break;
    }
  });
