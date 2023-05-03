import { CheckCircleOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import DashboardView from "../../components/DashboardView";
import DashboardContextProvider, {
  useDashboardContext,
} from "../../context/Dashboard";
import { useModalContext } from "../../context/Modal";
import { useRootContext } from "../../context/Root";
import withContext from "../../context/withContext";
import { API_URL } from "../../api/constants";

function CityName({ cityId }) {
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    async function fetchCityName() {
      const response = await fetch(`${API_URL}/cities/${cityId}`);
      const city = await response.json();
      setCityName(city.name);
    }
    fetchCityName();
  }, [cityId]);

  return <span>{cityName || "Loading..."}</span>;
}

function Dashboard() {
  const { dashboard, loadClujDashboard, reservePlace } =
    useDashboardContext();
  const { messageApi } = useRootContext();
  const { openModal } = useModalContext();

  const onCardClick = useCallback(
    (cardData) => {
      openModal({
        renderContent: () => (
          <Space direction="vertical">
            <Typography.Title>Reserve {cardData.company}</Typography.Title>
            <div>{cardData.about}</div>
            <div>
              <CityName cityId={cardData.city_id} />{" "}
              <CheckCircleOutlined style={{ color: "green" }} />
            </div>
          </Space>
        ),
        okText: "Reserve",
        callback: () => {
          reservePlace(cardData.id).then(() => {
            messageApi.success(
              `Reservation for ${cardData.company} was successful!`
            );
          });
        },
      });
    },
    [openModal]
  );

  useEffect(() => {
    loadClujDashboard();
  }, []);

  return (
    <DashboardView
      title="Available places in Cluj"
      dashboard={dashboard}
      onCardClick={onCardClick}
    />
  );
}

export default withContext(Dashboard, DashboardContextProvider);
