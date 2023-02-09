import React, { useState } from "react";
import { Alert, Button, Form, Input, Layout, Typography } from "antd";
import "./style.css";
const { Content } = Layout;

export default function RegisterView({ onFinish, isLoading, error }) {
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  return (
    <Layout>
      <Content style={{ display: "flex", alignItems: "center" }}>
        <Form
          onFinish={onFinish}
          className="register-form"
          disabled={isLoading}
        >
          <Typography.Title style={{ textAlign: "center" }}>
            Sign Up
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
            rules={[
              { required: true, message: "Password required" },
              {
                validator: validateToNextPassword,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            requiredMark
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirm password required" },
              {
                validator: compareToFirstPassword,
              },
            ]}
          >
            <Input.Password onBlur={handleConfirmBlur} />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button htmlType="submit" type="primary">
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
