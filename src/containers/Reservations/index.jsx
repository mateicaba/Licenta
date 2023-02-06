import React, { useCallback, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import DashboardView from "../../components/DashboardView";
import DashboardContextProvider, {
  useDashboardContext
} from "../../context/Dashboard";
import withContext from "../../context/withContext";

function Reservations() {
  const { loadReservedPlaces, dashboard } = useDashboardContext();
  const navigate = useNavigate();
  const { reservationId } = useParams();

  useEffect(() => {
    if (!reservationId) {
      loadReservedPlaces();
    }
  }, [reservationId]);

  const onCardClick = useCallback(({ id }) => {
    navigate(`/reservations/${id}`);
  }, []);

  return (
    <>
      <DashboardView
        title="My reservations"
        dashboard={dashboard}
        onCardClick={onCardClick}
      />
      <Outlet />
    </>
  );
}

export default withContext(Reservations, DashboardContextProvider);
