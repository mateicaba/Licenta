import Dashboard from "../Dashboard";
import NotFound from "../NotFound";
import Place from "../Place";
import Places from "../Places";
import Reservation from "../Reservation";
import Reservations from "../Reservations";
import Register from "../Register";
import DashboardBucharest from "../DashboardBucharest";

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
    element: <Dashboard />,
  },
  {
    path: "/placesIasi",
    element: <Dashboard />,
  },
  {
    path: "/placesBrasov",
    element: <Dashboard />,
  },
  {
    path: "/placesTimisoara",
    element: <Dashboard />,
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
