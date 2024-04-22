import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./App.css";
import guestRoutes from "./routes/guestRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import mainRoutes from "./routes/mainRoutes";

// Create a client
const queryClient = new QueryClient();

// create a router
const router = createBrowserRouter([...guestRoutes, ...mainRoutes]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
