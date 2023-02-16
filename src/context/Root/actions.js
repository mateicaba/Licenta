import {
  FETCH_CURRENT_USER,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SET_LOADER,
  UNSET_LOADER,
  LOGOUT,
} from "./reducer";

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export function loginFailed(err) {
  return {
    type: LOGIN_FAILED,
    payload: err,
  };
}

export function setLoader() {
  return {
    type: SET_LOADER,
  };
}

export function unsetLoader() {
  return {
    type: UNSET_LOADER,
  };
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function getCurrentUser(username) {
  return {
    type: FETCH_CURRENT_USER,
    payload: username,
  };
}
