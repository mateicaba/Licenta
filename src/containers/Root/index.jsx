import React from "react";
import { Layout } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import Content from "./content";
import Header from "./header";
import Navigation from "./navigaton";

export default function Root() {
  return (
    <Layout hasSider>
      <Navigation />
      <Layout style={{ marginLeft: 200 }}>
        <Header />
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
                position: "absolute",
                top: 0,
                right: 0,
                width: "6px",
                zIndex: 9999,
              }}
            />
          )}
          style={{ height: "calc(100vh - 0px )" }}
        >
          <Content />
        </Scrollbars>
      </Layout>
    </Layout>
  );
}
