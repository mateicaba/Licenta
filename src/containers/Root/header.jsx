import { Layout, Button, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import { useRootContext } from "../../context/Root";
import NewPlace from "../../components/NewPlace";
import { CityProvider } from "../../context/Cities";

export default function Header() {
  const { doLogout } = useRootContext();
  const [userRatio, setUserRatio] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3001/users");
      const data = await response.json();
      const totalHosted = data.reduce((acc, user) => acc + user.hosted, 0);
      const totalRented = data.reduce((acc, user) => acc + user.rented, 0);
      setUserRatio(totalHosted / totalRented);
    }
    fetchData();
  }, []);

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
        <div
          style={{ marginRight: "20px" }}
        >{`Hosted/Rented Ratio: ${userRatio.toFixed(2)}`}</div>
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
        {showNewPlaceForm && (
          <CityProvider>
            <NewPlace onCancel={handleCancelNewPlaceClick} />
          </CityProvider>
        )}
      </div>
    </Layout.Header>
  );
}
