import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Appointment from "./Pages/Appointment/Appointment";
import ContactUs from "./Pages/ContactUs/ContactUs";
import AddService from "./Pages/Dashboard/AddService";
import AllServices from "./Pages/Dashboard/AllServices";
import AllUsers from "./Pages/Dashboard/AllUsers";
import Dashboard from "./Pages/Dashboard/Dashboard";
import GiveReview from "./Pages/Dashboard/GiveReview";
import MyAppointments from "./Pages/Dashboard/MyAppointments";
import Reviews from "./Pages/Dashboard/Reviews";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import RequireAdmin from "./Pages/Login/RequireAdmin";
import RequireAuth from "./Pages/Login/RequireAuth";
import Payment from "./Pages/Payment/Payment";
import NotFound from "./Pages/Shared/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyAppointments />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="giveReview" element={<GiveReview />} />
          <Route
            path="services"
            element={
              <RequireAdmin>
                <AllServices />
              </RequireAdmin>
            }
          />
          <Route
            path="addService"
            element={
              <RequireAdmin>
                <AddService />
              </RequireAdmin>
            }
          />
          <Route
            path="users"
            element={
              <RequireAdmin>
                <AllUsers />
              </RequireAdmin>
            }
          />
        </Route>
        <Route
          path="payment/:id"
          element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          }
        />
        <Route
          path="appointment/:serviceName"
          element={
            <RequireAuth>
              <Appointment />
            </RequireAuth>
          }
        />
        <Route path="contact" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
