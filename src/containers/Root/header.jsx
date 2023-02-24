import { Layout, Button, Popconfirm } from "antd";
import React from "react";
import { useRootContext } from "../../context/Root";

export default function Header() {
  const { doLogout } = useRootContext();

  return (
    <Layout.Header
      style={{
        width: "100%",
        color: "white",
        position: "fixed",
        top: 0,
        left: 200,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>Places</div>
        <Popconfirm
          title="Are you sure you want to log out?"
          onConfirm={doLogout}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" style={{ marginRight: "180px" }}>
            Logout
          </Button>
        </Popconfirm>
      </div>
    </Layout.Header>
  );
}
