import { StrictMode, Suspense, lazy, useMemo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { dashboardRoute, loginRoute } from "./constants/routes.ts";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getTheme from "./theme";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import type { RootState } from "./store";
import "./i18n";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to={loginRoute} replace /> },
      {
        path: loginRoute,
        element: (
          <Suspense fallback={null}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: dashboardRoute,
        element: (
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        ),
      },
    ],
  },
]);

export function ThemeWrapper() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeWrapper />
    </Provider>
  </StrictMode>,
);
