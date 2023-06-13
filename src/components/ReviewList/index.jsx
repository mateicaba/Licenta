import React, { useContext, useState } from "react";
import { Table, Space, Button, Modal, Rate } from "antd";
import ReviewContext from "../../context/Reviews/ReviewContext";
import ReviewForm from "../ReviewForm";

const ReviewList = ({ placeId }) => {
  const { reviews, deleteReview, editReview } = useContext(ReviewContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => {
        return (
          <Space>
            {rating}
            <Rate disabled allowHalf defaultValue={rating} />
          </Space>
        );
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        const currentUsername = sessionStorage.getItem("currentUsername");

        if (record.username === currentUsername) {
          return (
            <Space size="middle">
              <Button type="primary" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </Button>
            </Space>
          );
        }
      },
    },
  ];


  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this review?",
      onOk: () => {
        deleteReview(id);
      },
    });
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setSelectedReview(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedReview(null);
    setIsModalVisible(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <Button type="primary" onClick={handleAdd}>
          Add Review
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={reviews.filter((r) => r.placeId === placeId)}
      />
      {isModalVisible && (
        <Modal
          visible={true}
          title={selectedReview ? "Edit Review" : "Add Review"}
          onCancel={handleCancel}
          footer={null}
        >
          <ReviewForm
            placeId={placeId}
            review={selectedReview}
            onClose={handleCancel}
          />
        </Modal>
      )}
    </div>
  );
};

export default ReviewList;
