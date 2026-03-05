import { Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/Reset-password";

function App() {
  return (
    <Routes>
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
