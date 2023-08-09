import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./App.routes";

const root = document.getElementById("root");
if (root == null) {
  throw new Error("Cannot find element with id='root'");
}

const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes></AppRoutes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
