import { Alert, Button, Form, Input, Layout, Typography } from "antd";
import React from "react";
import "./style.css";

export default function LoginView({ onFinish, isLoading, error }) {
  return (
    <Layout>
      <Layout.Content style={{ display: "flex", alignItems: "center" }}>
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
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    </Layout>
  );
}
