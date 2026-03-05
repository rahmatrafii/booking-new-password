import { Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/Reset-password";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
