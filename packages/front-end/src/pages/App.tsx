import Home from "./home";
import AppLayout from "../components/AppLayout";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";

interface AppProps {
  children: React.ReactElement;
  redirectTo: string;
}

const PrivateRoute = ({ children, redirectTo }: AppProps) => {
  const isAuthenticated = localStorage.getItem("u") !== null;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}
