import "./App.css";
import "./style.scss";
import "./media-query.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";

import "react-toastify/dist/ReactToastify.css";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userDetails");
        setUser(null);
        setActive("login");
        navigate("/login");
      })
      .catch((err) => {});
  };

  return (
    <div className="App page-container">
      <div className="content-wrap">
        <Header
          setActive={setActive}
          active={active}
          handleChangeLogout={logoutHandler}
          user={user}
        />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={<Home setActive={setActive} user={user} />}
          />
          <Route
            path="/forgotPassword"
            element={<ForgotPassword user={user} />}
          />
          <Route
            path="/detail/:id"
            element={<Detail setActive={setActive} user={user} />}
          />
          <Route
            path="/settings"
            element={
              user?.uid ? <Settings user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/write"
            element={
              user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/resetPassword"
            element={<ResetPassword user={user} />}
          />
          <Route
            path="/update/:id"
            element={
              user?.uid ? (
                <AddEditBlog user={user} setActive={setActive} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/register"
            element={
              <Register
                user={user}
                logoutHandler={logoutHandler}
                setActive={setActive}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login logoutHandler={logoutHandler} setActive={setActive} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
