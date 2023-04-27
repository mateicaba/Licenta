import React, { useContext, useState } from "react";
import { Form, Input, Rate, Button } from "antd";
import ReviewContext from "../../context/Reviews/ReviewContext";

const ReviewForm = ({ placeId, review, onClose }) => {
  const { addReview, editReview } = useContext(ReviewContext);
  const [formData, setFormData] = useState({
    rating: review ? review.rating : 3,
    comment: review ? review.comment : "",
  });

  const handleSubmit = () => {
    if (review) {
      editReview(review.id, { ...formData, placeId });
      onClose();
    } else {
      addReview({ ...formData, placeId });
      setFormData({ rating: 3, comment: "" });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="rating" initialValue={formData.rating}>
        <Rate allowHalf />
      </Form.Item>
      <Form.Item
        name="comment"
        initialValue={formData.comment}
        rules={[{ required: true, message: "Please input your comment!" }]}
      >
        <Input.TextArea placeholder="Leave a comment" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
