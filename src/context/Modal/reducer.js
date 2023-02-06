import produce from "immer";

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const initialState = {
  modals: [],
};

export default (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case OPEN_MODAL:
      case CLOSE_MODAL:
        draft.modals = action.payload;
        break;
      default:
        break;
    }
  });
