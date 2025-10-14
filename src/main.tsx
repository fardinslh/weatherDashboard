import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { dashboardRoute, loginRoute } from "./constants/routes.ts";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: loginRoute, element: <Login /> },
      { path: dashboardRoute, element: <Dashboard /> },
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
