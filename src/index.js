import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./containers/App";
import ModalManager from "./context/Modal";
import RootContextProvider from "./context/Root";

const root = document.getElementById("root");

const main = createRoot(root);

main.render(
  <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
    <RootContextProvider>
      <BrowserRouter>
        <ModalManager>
          <App />
        </ModalManager>
      </BrowserRouter>
    </RootContextProvider>
  </ConfigProvider>
);
