import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  fetchDashboard,
  fetchPlace,
  fetchReservedPlaces,
  updatePlace,
} from "../../api/places";
import {
  dashboardLoaded,
  dashboardLoadFailed,
  dashboardLoading,
} from "./actions";
import reducer, { initialState } from "./reducer";

const DashboardContext = createContext(initialState);

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export default function DashboardContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadDashboard = useCallback((city_id = null) => {
    dispatch(dashboardLoading());
    fetchDashboard(city_id)
      .then((data) => {
        dispatch(dashboardLoaded(data));
      })
      .catch((err) => {
        dispatch(dashboardLoadFailed(err.message));
      });
  }, []);

  const fetchCities = useCallback(async () => {
    const data = await fetchDashboard();
    const uniqueCities = [...new Set(data.map((place) => place.city))];
    return uniqueCities;
  }, []);

  const reservePlace = useCallback(
    async (id) => {
      const place = await fetchPlace(id);
      place.available = false;
      place.reserved = true;
      await updatePlace(place);
      loadDashboard();
    },
    [loadDashboard]
  );

  const loadReservedPlaces = useCallback(() => {
    dispatch(dashboardLoading());
    fetchReservedPlaces()
      .then((data) => dispatch(dashboardLoaded(data)))
      .catch((err) => dispatch(dashboardLoadFailed(err.message)));
  }, []);

  const cancelReservation = useCallback(
    async (id) => {
      const place = await fetchPlace(id);
      place.available = true;
      place.reserved = false;
      await updatePlace(place);
      loadDashboard();
    },
    [loadDashboard]
  );

  const providerValue = useMemo(
    () => ({
      dashboard: state,
      loadDashboard,
      fetchCities,
      reservePlace,
      loadReservedPlaces,
      cancelReservation,
    }),
    [
      state,
      loadDashboard,
      fetchCities,
      reservePlace,
      loadReservedPlaces,
      cancelReservation,
    ]
  );
  return (
    <DashboardContext.Provider value={providerValue}>
      {children}
    </DashboardContext.Provider>
  );
}
