import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// tus páginas

import AdminDash from "./pages/Admin/AdminDash";
import UserDash from "./pages/Manicurista/UserDash";
import Splash from "./pages/Splash/Splash";
import Login from "./pages/Login/Login";
import RootDash from "./pages/SuperAdmin/RootDash";
import CreateRol from "./pages/CreateRol/CreateRol";
import SuperadminLayout from "./pages/SuperAdmin/SuperAdmin";
import AdminLayout from "./pages/Admin/AdminLayout";
import UserLayout from "./pages/Manicurista/UserLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
            <Route element={<SuperadminLayout />}>
            <Route path="/rootDash" element={<RootDash />} />
              <Route path="/createRol" element={<CreateRol />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["administrador"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/adminDash" element={<AdminDash />} />
              <Route path="/crearRol" element={<CreateRol />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["manicurista"]} />}>
            <Route element={<UserLayout />}>
              <Route path="/userDash" element={<UserDash/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
