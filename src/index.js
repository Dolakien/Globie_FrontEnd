// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"; // Nếu có
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
