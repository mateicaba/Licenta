import React from "react";
import { Form, Input, Button } from "antd";
import "./style.css";

const NewPlace = ({ onCancel }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="new-place">
      <h1>Add your place</h1>

      <Form onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please input the name of your place!" },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Place
          </Button>
        </Form.Item>
        <Button type="primary" onClick={onCancel}>
          Back
        </Button>
      </Form>
    </div>
  );
};

export default NewPlace;
