/**
 * @fileoverview This file contains the useAuth custom hook which is used to access the auth state
 */
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;