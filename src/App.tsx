import { Routes, Route, Navigate } from "react-router-dom";
import ResetPassword from "./pages/Reset-password";

function App() {
  return (
    <Routes>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/reset-password" replace />} />
    </Routes>
  );
}

export default App;
