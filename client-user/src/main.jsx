import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SignUp from "./pages/sign-up.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import { AuthProvider } from "./utils/AuthContext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "sign-up", element: <SignUp /> },
  {
    element: <ProtectedRoutes />,
    children: [{ path: "dashboard", element: <Dashboard /> }],
  },
]);
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </StrictMode>
  </AuthProvider>
);
