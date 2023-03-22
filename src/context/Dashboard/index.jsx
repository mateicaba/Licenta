import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  fetchDashboard,
  fetchBucharestDashboard,
  fetchClujDashboard,
  fetchIasiDashboard,
  fetchBrasovDashboard,
  fetchTimisoaraDashboard,
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

  const loadBucharestDashboard = useCallback((city_id = null) => {
    dispatch(dashboardLoading());
    fetchBucharestDashboard(city_id)
      .then((data) => {
        dispatch(dashboardLoaded(data));
      })
      .catch((err) => {
        dispatch(dashboardLoadFailed(err.message));
      });
  }, []);

  const loadClujDashboard = useCallback((city_id = null) => {
    dispatch(dashboardLoading());
    fetchClujDashboard(city_id)
      .then((data) => {
        dispatch(dashboardLoaded(data));
      })
      .catch((err) => {
        dispatch(dashboardLoadFailed(err.message));
      });
  }, []);

  const loadIasiDashboard = useCallback((city_id = null) => {
    dispatch(dashboardLoading());
    fetchIasiDashboard(city_id)
      .then((data) => {
        dispatch(dashboardLoaded(data));
      })
      .catch((err) => {
        dispatch(dashboardLoadFailed(err.message));
      });
  }, []);

  const loadBrasovDashboard = useCallback((city_id = null) => {
    dispatch(dashboardLoading());
    fetchBrasovDashboard(city_id)
      .then((data) => {
        dispatch(dashboardLoaded(data));
      })
      .catch((err) => {
        dispatch(dashboardLoadFailed(err.message));
      });
  }, []);

  const loadTimisoaraDashboard = useCallback((city_id = null) => {
    dispatch(dashboardLoading());
    fetchTimisoaraDashboard(city_id)
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

  const loadReservedPlaces = useCallback(() => {
    dispatch(dashboardLoading());
    fetchReservedPlaces()
      .then((data) => dispatch(dashboardLoaded(data)))
      .catch((err) => dispatch(dashboardLoadFailed(err.message)));
  }, []);

  const reservePlace = useCallback(
    async (id) => {
      const place = await fetchPlace(id);
      place.available = false;
      place.reserved = sessionStorage.getItem("currentUsername");
      await updatePlace(place);
      loadDashboard();
    },
    [loadDashboard]
  );

  const cancelReservation = useCallback(
    async (id) => {
      const place = await fetchPlace(id);
      place.available = true;
      place.reserved = "";
      await updatePlace(place);
      loadDashboard();
    },
    [loadDashboard]
  );

  const providerValue = useMemo(
    () => ({
      dashboard: state,
      loadDashboard,
      loadBucharestDashboard,
      loadClujDashboard,
      loadIasiDashboard,
      loadBrasovDashboard,
      loadTimisoaraDashboard,
      fetchCities,
      reservePlace,
      loadReservedPlaces,
      cancelReservation,
    }),
    [
      state,
      loadDashboard,
      loadBucharestDashboard,
      loadClujDashboard,
      loadIasiDashboard,
      loadBrasovDashboard,
      loadTimisoaraDashboard,
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
