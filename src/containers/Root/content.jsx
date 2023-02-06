import { Layout } from "antd";
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

export default function Content() {
  return (
    <Layout.Content
      style={{ margin: "84px 16px 0", overflow: "initial", padding: 16 }}
    >
      {useRoutes(routes)}
    </Layout.Content>
  );
}
