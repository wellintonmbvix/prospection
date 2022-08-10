import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { Flowbite } from "./lib/components";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { queryClient } from "./store/services/queryClient";
import { SnackbarProvider } from "./components/Snackbar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (root) {
  const theme = {
    sidebar: {
      base: "h-full bg-inherit",
      inner:
        "h-full overflow-y-auto overflow-x-hidden rounded bg-inherit py-4 px-3",
    },
  };

  root.render(
    <Flowbite theme={{ theme }}>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
            </BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </Flowbite>
  );
}
