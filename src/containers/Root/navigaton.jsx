import { CompassOutlined } from "@ant-design/icons";
import { Layout, Menu, Space, Typography } from "antd";
import React, { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import menu from "./menu";

export default function Navigation() {
  const navigate = useNavigate();

  const onNavigationClick = useCallback(({ key }) => navigate(key), []);

  const { pathname } = useLocation();

  const defaultNavigationKey = useMemo(() => {
    const endIndex = pathname.lastIndexOf("/");
    return pathname.substring(0, endIndex || pathname.length);
  }, [pathname]);

  return (
    <Layout.Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: "thin", 
        scrollbarColor: "#888 #f1f1f1", 
      }}
    >
      <Scrollbars
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: "#888",
              borderRadius: "5px",
            }}
          />
        )}
      >
        <Space
          style={{
            height: 100,
            padding: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography.Text
            style={{
              color: "white",
              fontFamily: "Courier New",
              fontSize: 24,
            }}
          >
            UniStay
          </Typography.Text>
          <CompassOutlined style={{ color: "whitesmoke", fontSize: 22 }} spin />
        </Space>
        <Menu
          theme="dark"
          onClick={onNavigationClick}
          defaultSelectedKeys={[defaultNavigationKey]}
          selectedKeys={[defaultNavigationKey]}
          items={menu}
        />
        <Space
          style={{ flex: 1, height: "calc(100vh - 172px)" }}
          direction="vertical"
        >
          &nbsp;
        </Space>
      </Scrollbars>
    </Layout.Sider>
  );
}
