import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Complaints from "./pages/Complaints";
import AdminPanel from "./pages/AdminPanel";
import Students from "./pages/Students";
import Visitors from "./pages/Visitors";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <DataProvider>

        {/* REMOVE broken condition */}

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/rooms"
            element={
              <PrivateRoute>
                <Rooms />
              </PrivateRoute>
            }
          />

          <Route
            path="/students"
            element={
              <PrivateRoute>
                <Students />
              </PrivateRoute>
            }
          />

          <Route
            path="/complaints"
            element={
              <PrivateRoute>
                <Complaints />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminPanel />
              </PrivateRoute>
            }
          />

          <Route path="/visitors" element={<Visitors />} />
        </Routes>

      </DataProvider>
    </AuthProvider>
  );
}

export default App;
