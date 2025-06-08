import {  createContext, useContext, useState } from "react";
import { deleteUserFromAPI, getUsersFromAPI, loginRequest, RegisterRequest } from "../api/auth";

interface UserLogin {
  email: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  rol: "manicurista" | "administrador" | "superadmin";
}

interface UserRegister {
  username: string;
  email: string;
  password: string;
  contact: string;
  rh: string;
  eps: string;
  age: string;
  rol: string
}

interface Employees{
  id: string;
  username: string;
  email: string;
  password: string;
  contact: string;
  rh: string;
  eps: string;
  age: string;
  rol: string
}

interface AuthContextType {
  user: User | null;
  employees: Employees[];
  signin: (user: UserLogin) => Promise<void>;
  signup: (user: UserRegister) => Promise<void>;
  getEmployees: () => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  isAuthenticated: boolean;
  errors: string[];
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth =()=>{
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser]= useState(null);
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  

  const signin = async (user:UserLogin)=>{
     try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (user: UserRegister) => {
  try {
    await RegisterRequest(user);
    setErrors([]);
  } catch (error: any) {
   console.log(error)
  }
  };

   const getEmployees = async () => {
    try {
      const res = await getUsersFromAPI();
      setEmployees(res.data);
      setErrors([]);
    } catch (error) {
      console.log(error)
    }
  }

  const deleteEmployee = async (id: string) => {
    try {
      await deleteUserFromAPI(id);
      setEmployees((prev) => prev.filter((employee) => employee.id.toString() !== id));
      setErrors([]);
    } catch (error) {
      console.log(error);
    }
  }

  return(
   <AuthContext.Provider value={{ signin, signup,getEmployees, deleteEmployee, user, isAuthenticated, errors, employees }}>
      {children}
    </AuthContext.Provider>
  )
}