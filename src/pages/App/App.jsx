import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import HomeLayout from "../../components/Home/HomeLayout";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import ProtectedRoute from "../../components/ProtecedRoute";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  return (
    <main className="App h-full">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} setLatitude={setLatitude} setLongitude={setLongitude} />
          <Routes>
            {/* Route components in here */}
            <Route path="/" element={<HomeLayout longitude={longitude} latitude={latitude} />} />
            <Route path="/login" element={<HomeLayout longitude={longitude} latitude={latitude} />} />
            <Route path="/signup" element={<HomeLayout longitude={longitude} latitude={latitude} />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/" element={<LoginForm setUser={setUser} />} />
        </Routes>
      )}
    </main>
  );
}
