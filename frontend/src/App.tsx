import { BrowserRouter, Route, Routes } from "react-router-dom"
import Splash from "./pages/Splash/Splash"
import Login from "./pages/Login/Login"
import { AuthProvider } from "./context/AuthContext"
import RootDash from "./pages/RootDash/RootDash"
import ProtectedRoute from "./components/ProtectedRoute"
import UserDash from "./pages/UserDash"
import AdminDash from "./pages/AdminDash"

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
           <Route
              path="/rootDash"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <RootDash />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/adminDash"
              element={
                <ProtectedRoute allowedRoles={["administrador"]}>
                  <AdminDash />
                </ProtectedRoute>
              }
            />

            <Route
              path="/userDash"
              element={
                <ProtectedRoute allowedRoles={["manicurista"]}>
                  <UserDash />
                </ProtectedRoute>
              }
            />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
