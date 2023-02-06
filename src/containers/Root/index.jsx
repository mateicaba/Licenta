import { Layout } from "antd";
import React from "react";
import Content from "./content";
import Header from "./header";
import Navigation from "./navigaton";

export default function Root() {

  return (
    <Layout hasSider>
      <Navigation />
      <Layout style={{ marginLeft: 200 }}>
        <Header />
        <Content />
      </Layout>
    </Layout>
  );
}
