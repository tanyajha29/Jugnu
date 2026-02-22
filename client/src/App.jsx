import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FireflyProvider } from "./context/FireflyContext";
import JugnuFirefly from "./components/layout/JugnuFirefly";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import Dashboard from "./components/pages/Dashboard";
import MoodPage from "./components/pages/MoodPage";
import ProtectedRoute from "./ProtectedRoute";
import Landing from "./components/pages/Landing";
import ReflectionPage from "./components/pages/ReflectionPage";
import InsightsPage from "./components/pages/InsightsPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FireflyProvider>
          <JugnuFirefly />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/mood"
              element={
                <ProtectedRoute>
                  <MoodPage />
                </ProtectedRoute>
              }
            />
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
        </FireflyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
