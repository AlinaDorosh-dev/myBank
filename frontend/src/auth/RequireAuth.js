import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import UserDashboard from "../pages/UserDashboard";
//import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
const RequireAuth = () => {
  // console.log("allowedRole", allowedRole);
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  //const { auth } = useAuth();
  console.log("auth", auth);
  const decoded = jwt_decode(auth);
  const userRole = decoded?.UserInfo?.role;
  const userId = decoded?.UserInfo?.id;
  console.log("userRole", userRole);
  console.log("userId", userId);

  return userRole === "user" ? (
     <UserDashboard userId={userId}/>
  ) : (
    <Navigate
      to={{ pathname: "/unauthorized", state: { from: location } }}
      replace
    />
  );

  // allowedRole === userRole ? (
  //   <Outlet />
  // ) : userRole ? (
  //   <Navigate
  //     to={{ pathname: "/unauthorized", state: { from: location } }}
  //     replace
  //   />
  // ) : (
  //   <Navigate to={{ pathname: "/login", state: { from: location } }} replace />
  // );
};

export default RequireAuth;
