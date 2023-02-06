import { Button, Drawer, Popconfirm, Space } from "antd";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardContextProvider, {
  useDashboardContext
} from "../../context/Dashboard";
import { useRootContext } from "../../context/Root";
import withContext from "../../context/withContext";

function Reservation() {
  const { cancelReservation, loadReservedPlaces } = useDashboardContext();
  const { messageApi } = useRootContext();

  const navigate = useNavigate();
  const { reservationId } = useParams();

  const onClose = useCallback(() => {
    navigate(-1);
  }, []);

  const onCancelReservation = useCallback(() => {
    cancelReservation(reservationId).then(() => {
      messageApi.success("Reservation was cancelled!");
      navigate(-1);
    });
  }, [reservationId]);

  return (
    <Drawer
      title={`Details`}
      placement="right"
      size="large"
      onClose={onClose}
      open
      extra={
        <Space>
          <Popconfirm
            title="Cancel reservation"
            description="Are you sure that you want to cancel this reservation?"
            onConfirm={onCancelReservation}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost" style={{ color: "red" }}>
              Cancel reservation
            </Button>
          </Popconfirm>
          <Button type="primary" onClick={onClose}>
            Pay
          </Button>
        </Space>
      }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}

export default withContext(Reservation, DashboardContextProvider);
