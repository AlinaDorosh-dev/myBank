import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./auth/RequireAuth";
import { AuthProvider } from "./context/AuthProvider";
import NotificationProvider from "./context/NotificationProvider";
import AccountManagement from "./pages/AccountManagement";
import FinishRegistration from "./pages/FinishRegistration";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='login' element={<Login />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<ErrorPage />} />

            {/* private routes */}
            <Route
              path='dashboard'
              element={<RequireAuth allowedRole='user' />}
            >
              <Route
                path='finish-registration'
                element={<FinishRegistration />}
              />
              <Route
                path='account-management'
                element={
                  <NotificationProvider>
                    <AccountManagement />
                  </NotificationProvider>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
