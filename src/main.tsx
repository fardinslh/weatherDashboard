import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { dashboardRoute, loginRoute } from "./constants/routes.ts";
import Dashboard from "./pages/Dashboard/index.tsx";
import Login from "./pages/Login/index.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: loginRoute,
        element: <Login />,
      },
      {
        path: dashboardRoute,
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
