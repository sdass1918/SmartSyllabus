"use client";
import ClientPage from "./components/ClientPage";
import { Provider } from "react-redux";
import store from "./store/store";

export default function Home(children: React.ReactNode) {
  return (
    <Provider store={store}>
      <ClientPage />
    </Provider>
  );
}
