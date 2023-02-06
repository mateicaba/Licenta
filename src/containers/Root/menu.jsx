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
    key: "/places",
    icon: <HeatMapOutlined />,
    label: "Places",
  },
  {
    key: "/reservations",
    icon: <UploadOutlined />,
    label: "Reservations",
  },
];
