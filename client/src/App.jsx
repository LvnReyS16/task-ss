import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import { AuthProvider } from "./auth/AuthContext";

import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard />} path="/" exact />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
