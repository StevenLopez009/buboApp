import {  createContext, useContext, useState } from "react";
import { loginRequest } from "../api/auth";

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


interface AuthContextType {
  user: User | null;
  signin: (user: UserLogin) => Promise<void>;
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

  return(
   <AuthContext.Provider value={{ signin, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  )
}