import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Ecommerce } from "./pages";
import Login from "./pages/login/Login";
import { AppLayout } from "./AppLayout";
import { ProtectedRoute, PublicOnlyRoute } from "./guards/RouteGuards";

import "./App.css";
import AuditLogs from "./pages/audit-logs/AuditLogs.tsx";

function App() {
  return (
    <div>
      <BrowserRouter basename="/admin">
        <Routes>
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected: doar dacă e logat */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/ecommerce" replace />} />
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/audit-logs" element={<AuditLogs />} />
            </Route>
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
