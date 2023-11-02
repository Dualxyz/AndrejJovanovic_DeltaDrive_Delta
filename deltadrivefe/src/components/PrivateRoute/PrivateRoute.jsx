import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const userInfo = !!token;

    return userInfo ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
