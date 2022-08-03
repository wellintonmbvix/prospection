import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home";
import Users from "./user";
import Classification from "./classification";
import Prospects from "./prospect";
import Login from "./login";
import { AppLayout } from "../components";

interface PrivateRouteProps {
  children: React.ReactElement;
  redirectTo: string;
}

const PrivateRoute = ({ children, redirectTo }: PrivateRouteProps) => {
  const isAuthenticated = localStorage.getItem("u") !== null;
  
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default function Rotas() {
  return (
    <>
      <Routes>
        <Route
          element={
            <PrivateRoute redirectTo="/">
              <AppLayout>
                <Home />
              </AppLayout>
            </PrivateRoute>
          }
          path="/home"
        />
        <Route
          element={
            <PrivateRoute redirectTo="/">
              <AppLayout>
                <Users />
              </AppLayout>
            </PrivateRoute>
          }
          path="/users"
        />
        <Route
          element={
            <PrivateRoute redirectTo="/">
              <AppLayout>
                <Classification />
              </AppLayout>
            </PrivateRoute>
          }
          path="/classification"
        />
        <Route
          element={
            <PrivateRoute redirectTo="/">
              <AppLayout>
                <Prospects />
              </AppLayout>
            </PrivateRoute>
          }
          path="/prospects"
        />
        <Route element={<Login />} path="/" />
      </Routes>
    </>
  );
}
