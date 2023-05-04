import { Button, Drawer, Popconfirm, Space } from "antd";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardContextProvider, {
  useDashboardContext
} from "../../context/Dashboard";
import { useRootContext } from "../../context/Root";
import withContext from "../../context/withContext";
import ReviewForm from "../../components/ReviewForm";
import ReviewList from "../../components/ReviewList";
import { API_URL } from "../../api/constants";

function Reservation() {
  const { cancelReservation, loadReservedPlaces } = useDashboardContext();
  const { messageApi } = useRootContext();

  const navigate = useNavigate();
  const { reservationId } = useParams();

  const onClose = useCallback(() => {
    navigate(-1);
  }, []);

const onCancelReservation = useCallback(async () => {
  const username = sessionStorage.getItem("currentUsername");
  const userResponse = await fetch(`${API_URL}/users?username=${username}`);
  const user = await userResponse.json();
  const updatedUser = {
    ...user[0],
    rented: user[0].rented - 1,
  };
  await fetch(`${API_URL}/users/${user[0].id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
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
      <ReviewForm />
      <ReviewList />
    </Drawer>
  );
}

export default withContext(Reservation, DashboardContextProvider);
