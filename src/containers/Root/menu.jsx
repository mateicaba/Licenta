import {
  DashboardOutlined,
  HeatMapOutlined,
  UploadOutlined
} from "@ant-design/icons";

export default [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/placesBucharest",
    icon: <HeatMapOutlined />,
    label: "Bucharest",
  },
  {
    key: "/placesCluj",
    icon: <HeatMapOutlined />,
    label: "Cluj",
  },
  {
    key: "/placesIasi",
    icon: <HeatMapOutlined />,
    label: "Iasi",
  },
  {
    key: "/placesBrasov",
    icon: <HeatMapOutlined />,
    label: "Brasov",
  },
  {
    key: "/placesTimisoara",
    icon: <HeatMapOutlined />,
    label: "Timisoara",
  },
  {
    key: "/reservations",
    icon: <UploadOutlined />,
    label: "Reservations",
  },
];
