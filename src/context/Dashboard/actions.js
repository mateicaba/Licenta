import {
  FETCH_DASHBOARD_FAILED,
  FETCH_DASHBOARD_REQUEST,
  FETCH_DASHBOARD_SUCCESS,
} from "./reducer";

export function dashboardLoading() {
  return {
    type: FETCH_DASHBOARD_REQUEST,
  };
}

export function dashboardLoaded(data) {
  return {
    type: FETCH_DASHBOARD_SUCCESS,
    payload: data,
  };
}

export function dashboardLoadFailed(err) {
  return {
    type: FETCH_DASHBOARD_FAILED,
    payload: err,
  };
}
