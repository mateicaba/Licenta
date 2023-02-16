import { Layout, Button } from "antd";
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
        <Button
          type="primary"
          onClick={doLogout}
          style={{ marginRight: "180px" }}
        >
          Logout
        </Button>
      </div>
    </Layout.Header>
  );
}
