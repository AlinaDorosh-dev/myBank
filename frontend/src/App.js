import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  useAuth  from "./hooks/useAuth";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./auth/RequireAuth";
import NotificationProvider from "./context/NotificationProvider";
import AccountManagementPage from "./pages/AccountManagementPage";
import FinishRegistration from "./pages/FinishRegistration";

function App() {
  const { auth } = useAuth();

  const navigate = useNavigate();

  return (
    
      <Routes>
        {/* public routes */}
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<Login />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<ErrorPage />} />

          {/* private routes */}
          <Route path='dashboard' element={<RequireAuth allowedRole='user' />}>
            <Route
              path='finish-registration'
              element={<FinishRegistration />}
            />
            <Route
              path='account-management'
              element={
                <NotificationProvider>
                  <AccountManagementPage />
                </NotificationProvider>
              }
            />
          </Route>
        </Route>
      </Routes>
  
  );
}

export default App;
