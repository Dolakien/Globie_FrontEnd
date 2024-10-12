// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"; // Nếu có
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer />
  </QueryClientProvider>,
  document.getElementById("root")
);
