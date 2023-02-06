import { CheckCircleOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import React, { useCallback, useEffect } from "react";
import DashboardView from "../../components/DashboardView";
import DashboardContextProvider, {
  useDashboardContext
} from "../../context/Dashboard";
import { useModalContext } from "../../context/Modal";
import { useRootContext } from "../../context/Root";
import withContext from "../../context/withContext";

function Dashboard() {
  const { dashboard, loadDashboard, reservePlace } = useDashboardContext();
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
              {cardData.price}{" "}
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
    loadDashboard();
  }, []);

  return (
    <DashboardView
      title="Available places"
      dashboard={dashboard}
      onCardClick={onCardClick}
    />
  );
}

export default withContext(Dashboard, DashboardContextProvider);
