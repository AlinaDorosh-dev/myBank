/**
 * @fileoverview This file contains the RequireAuth component which is used to
 * check if the user is logged in and if the user is authorized to access the
 * route
 */
import { useNavigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
const RequireAuth = ({ allowedRole }) => {
  const navigate = useNavigate();

  const { auth } = useAuth();
  const decoded = jwt_decode(auth);
  const userRole = decoded?.UserInfo?.role;
  const userVerified = decoded?.UserInfo?.verified;

  useEffect(() => {
    switch (true) {
      case !auth:
        navigate("/login", { replace: true });
        break;
      case userRole !== allowedRole:
        navigate("/unauthorized", { replace: true });
        break;
      case userRole === allowedRole && userVerified:
        navigate("/dashboard/account-management", { replace: true });
        break;
      case userRole === allowedRole && !userVerified:
        navigate("/dashboard/finish-registration", { replace: true });
        break;
      default:
        navigate("/", { replace: true });
        break;
    }
  }, []);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  return <Outlet />;
};

export default RequireAuth;
