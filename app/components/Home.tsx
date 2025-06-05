"use client";
import React from "react";
import ClientPage from "./ClientPage";
import { Provider } from "react-redux";
import store from "../store/store";
export default function Home(): React.ReactElement {
  return (
    <Provider store={store}>
      <ClientPage />
    </Provider>
  );
}
