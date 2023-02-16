import React, { useState } from "react";
import { Button, Form, Input, Layout, Typography, Alert } from "antd";
import "./style.css";
import RegisterView from "../RegisterView";

const LoginView = ({ onFinish, isLoading, error }) => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Layout>
      <Layout.Content style={{ display: "flex", alignItems: "center" }}>
        {showRegister ? (
          <RegisterView />
        ) : (
          <Form onFinish={onFinish} className="login-form" disabled={isLoading}>
            <Typography.Title style={{ textAlign: "center" }}>
              Login
            </Typography.Title>
            {error && (
              <Alert
                style={{ marginBottom: 10 }}
                description={error}
                type="error"
                closable
              />
            )}
            <Form.Item
              name="username"
              requiredMark
              label="Username"
              rules={[{ required: true, message: "Username required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              requiredMark
              label="Password"
              rules={[{ required: true, message: "Password required" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Form.Item style={{ width: "100% / 2" }}>
                <Button htmlType="submit" type="primary">
                  Login
                </Button>
              </Form.Item>
              <Form.Item style={{ width: "100% / 2" }}>
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>
              </Form.Item>
            </Form.Item>
          </Form>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default LoginView;
