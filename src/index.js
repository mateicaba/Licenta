import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./containers/App";
import { CityProvider } from "./context/Cities";
import DashboardContextProvider from "./context/Dashboard";
import ModalManager from "./context/Modal";
import RootContextProvider from "./context/Root";
import ReviewProvider from "./context/Reviews/ReviewProvider";

const root = document.getElementById("root");

const main = createRoot(root);

main.render(
  <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
    <RootContextProvider>
      <BrowserRouter>
        <ModalManager>
          <DashboardContextProvider>
            <CityProvider>
              <ReviewProvider>
                <App />
              </ReviewProvider>
            </CityProvider>
          </DashboardContextProvider>
        </ModalManager>
      </BrowserRouter>
    </RootContextProvider>
  </ConfigProvider>
);
