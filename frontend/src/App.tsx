import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ServiceProvider } from "./context/ServiceContext";

import AdminDash from "./pages/Admin/AdminDash";
import UserDash from "./pages/Manicurista/UserDash";
import Splash from "./pages/Splash/Splash";
import Login from "./pages/Login/Login";
import RootDash from "./pages/SuperAdmin/RootDash";
import CreateRol from "./pages/SuperAdmin/CreateRol/CreateRol";
import SuperadminLayout from "./pages/SuperAdmin/SuperAdmin";
import AdminLayout from "./pages/Admin/AdminLayout";
import UserLayout from "./pages/Manicurista/UserLayout";
import Services from "./pages/Services/Services";
import ServiceForm from "./pages/Manicurista/services/ServiceForm";
import ServicesDone from "./pages/Manicurista/servicesDone/ServicesDone";
import CreateRolAdmin from "./pages/Admin/createRol/createRolAdmin";
import Bills from "./pages/Admin/bills/Bills";
import ShowBills from "./pages/SuperAdmin/Bills/ShowBills";
import Aprove from "./pages/Admin/AproveServices/Aprove";
import Pay from "./pages/SuperAdmin/Pay/Pay";
import RegisterProduct from "./pages/Manicurista/products/registerProduct";

function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
            <Route element={<SuperadminLayout />}>
            <Route path="/rootDash" element={<RootDash />} />
              <Route path="/superadmin/createRol" element={<CreateRol />} />
              <Route path="/superadmin/services" element={<Services />} />
              <Route path="/superadmin/bills" element={<ShowBills />} />
              <Route path="/superadmin/pays" element={<Pay />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["administrador"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/adminDash" element={<AdminDash />} />
              <Route path="/admin/createRol" element={<CreateRolAdmin />} />
              <Route path="/admin/services" element={<Services />} />
              <Route path="/admin/aproveServices" element={<Aprove />} />
               <Route path="/admin/bills" element={<Bills />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["manicurista"]} />}>
            <Route element={<UserLayout />}>
              <Route path="/userDash" element={<UserDash/>} />
              <Route path="/registerService" element={<ServiceForm/>} />
              <Route path="/servicesDone" element={<ServicesDone/>} />
              <Route path="/registerProduct" element={<RegisterProduct/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </ServiceProvider>
    </AuthProvider>
  );
}

export default App;
