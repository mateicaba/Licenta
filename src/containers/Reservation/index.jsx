import React, { useCallback, useEffect, useState } from "react";
import { Button, Drawer, Modal, Popconfirm, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDashboardContext } from "../../context/Dashboard";
import { useRootContext } from "../../context/Root";
import ReviewList from "../../components/ReviewList";
import { API_URL } from "../../api/constants";

function Reservation() {
  const { cancelReservation, fetchPlace } = useDashboardContext();
  const { messageApi } = useRootContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [placeDetails, setPlaceDetails] = useState(null);

  const navigate = useNavigate();
  const { reservationId } = useParams();

  const onClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

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
  }, [cancelReservation, messageApi, navigate, reservationId]);

  const fetchPlaceDetails = useCallback(async () => {
    try {
      const place = await fetchPlace(reservationId);
      setPlaceDetails(place);
      setModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch place details:", error);
    }
  }, [fetchPlace, reservationId]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  useEffect(() => {
    fetchPlaceDetails();
  }, [fetchPlaceDetails]);

  return (
    <Drawer
      title={`Details`}
      placement="right"
      size="large"
      onClose={onClose}
      visible={true}
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
          <Button type="primary" onClick={fetchPlaceDetails}>
            Contact
          </Button>
        </Space>
      }
    >
      <p>Get in touch with your new friend!</p>
      <br></br>
      <p>Don't forget to leave a review afterwards</p>
      {/* <ReviewForm /> */}
      <ReviewList />
      <Modal visible={modalVisible} onCancel={closeModal} footer={null}>
        <p>Email: {placeDetails?.email}</p>
        <p>Phone: {placeDetails?.phone}</p>
        <Button type="primary" onClick={closeModal}>
          Close
        </Button>
      </Modal>
    </Drawer>
  );
}

export default Reservation;
