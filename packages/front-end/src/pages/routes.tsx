import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home";
import Users from "./user";
import Classification from "./classification";
import Prospects from "./prospect";
import Login from "./login";
import { AppLayout } from "../components";
import NewUsers from "./user/novo";
import UppdateUsers from "./user/editar";
import NewClassification from "./classification/novo";
import UpdateClassification from "./classification/editar";

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
                <UppdateUsers />
              </AppLayout>
            </PrivateRoute>
          }
          path="/users/editar"
        />
        <Route
          element={
            <PrivateRoute redirectTo="/">
              <AppLayout>
                <NewUsers />
              </AppLayout>
            </PrivateRoute>
          }
          path="/users/novo"
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
                <NewClassification />
              </AppLayout>
            </PrivateRoute>
          }
          path="/classification/novo"
        />       
                <Route
          element={
            <PrivateRoute redirectTo="/">
              <AppLayout>
                <UpdateClassification />
              </AppLayout>
            </PrivateRoute>
          }
          path="/classification/editar"
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
