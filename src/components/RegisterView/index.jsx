import React, { useState } from "react";
import { Form, Input, Button, Layout, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import "./style.css";
import LoginView from "../LoginView";

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // check if passwords match
      if (values.password !== values.confirmPassword) {
        message.error("Passwords do not match");
        return;
      }

      // check if username is already taken
      const { data: users } = await axios.get("http://localhost:3001/users");
      const takenUsername = users.find(
        (user) => user.username === values.username
      );
      if (takenUsername) {
        message.error("Username is already taken");
        return;
      }

      // save new user
      const newUser = {
        id: Date.now(),
        username: values.username,
        password: values.password,
        rented: 0,
        hosted: 0,
      };
      await axios.post("http://localhost:3001/users", newUser);
      message.success("New user created");
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const checkFormValidity = () => {
    const values = form.getFieldsValue();
    return values.username && values.password && values.confirmPassword;
  };

  return (
    <Layout>
      <Layout.Content style={{ display: "flex", alignItems: "center" }}>
        {showLogin ? (
          <LoginView />
        ) : (
          <Form form={form} className="register-form" onFinish={handleSubmit}>
            <Typography.Title style={{ textAlign: "center" }}>
              Register
            </Typography.Title>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item style={{ width: "100% / 2" }}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!checkFormValidity}
              >
                Register
              </Button>
            </Form.Item>
            <Form.Item style={{ width: "100% / 2" }}>
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => setShowLogin(true)}
              >
                Back
              </Button>
            </Form.Item>
          </Form>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default RegistrationForm;
