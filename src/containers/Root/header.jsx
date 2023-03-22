import { Layout, Button, Popconfirm } from "antd";
import React, { useState } from "react";
import { useRootContext } from "../../context/Root";
import NewPlace from "../../components/NewPlace";

export default function Header() {
  const { doLogout } = useRootContext();
  const [showNewPlaceForm, setShowNewPlaceForm] = useState(false);

  const handleNewPlaceClick = () => {
    setShowNewPlaceForm(true);
  };

  const handleCancelNewPlaceClick = () => {
    setShowNewPlaceForm(false);
  };

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
        <div style={{ flexGrow: 1 }}>Places</div>
        <div>
          <Button
            type="primary"
            style={{ marginRight: "20px" }}
            onClick={handleNewPlaceClick}
          >
            Add your place
          </Button>
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
      </div>
      <div>
        {showNewPlaceForm && <NewPlace onCancel={handleCancelNewPlaceClick} />}
      </div>
    </Layout.Header>
  );
}
