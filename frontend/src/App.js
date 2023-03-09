import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout";
import Unathorithed from "./pages/Unathorithed";
import RequireAuth from "./auth/RequireAuth";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='login' element={<Login />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='signup' element={<SignUp />} />
            {/* <Route path='/forgot-password' element={<ForgotPassword />} /> */}
            <Route path='unathorithed' element={<Unathorithed />} />
            <Route path='*' element={<ErrorPage />} />

            <Route path='dashboard' element={<RequireAuth />} />

            {/* <Route element={<RequireAuth allowedRole='user' />}> */}
            {/* <Route path='dashboard' element={<UserDashboard />} /> */}
            {/* <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} /> */}
            {/* </Route> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
