import Dashboard from "../Dashboard";
import NotFound from "../NotFound";
import Place from "../Place";
import Places from "../Places";
import Reservation from "../Reservation";
import Reservations from "../Reservations";

import DashboardBucharest from "../DashboardBucharest";
import DashboardCluj from "../DashboardCluj";
import DashboardIasi from "../DashboardIasi";
import DashboardBrasov from "../DashboardBrasov";
import DashboardTimisoara from "../DashboardTimisoara";

export default [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/placesBucharest",
    element: <DashboardBucharest />,
  },
  {
    path: "/placesCluj",
    element: <DashboardCluj />,
  },
  {
    path: "/placesIasi",
    element: <DashboardIasi />,
  },
  {
    path: "/placesBrasov",
    element: <DashboardBrasov />,
  },
  {
    path: "/placesTimisoara",
    element: <DashboardTimisoara />,
  },
  {
    path: "/places",
    element: <Places />,
    children: [
      {
        path: ":placeId",
        element: <Place />,
      },
    ],
  },
  {
    path: "/reservations",
    element: <Reservations />,
    children: [
      {
        path: ":reservationId",
        element: <Reservation />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
