import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "./components/pages/Landing";
import ReflectionPage from "./components/pages/ReflectionPage";
import InsightsPage from "./components/pages/InsightsPage";
import Navbar from "./components/layout/Navbar";
import JugnuEntity from "./components/layout/JugnuEntity";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <JugnuEntity />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/reflection" element={<ReflectionPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
