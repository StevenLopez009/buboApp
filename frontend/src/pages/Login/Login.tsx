import {useForm} from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserLogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<UserLogin>();
  const {signin, isAuthenticated, user}= useAuth()
  const navigate= useNavigate()

  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.rol) {
        case "superadmin":
          navigate("/rootDash");
          break;
        case "administrador":
          navigate("/adminDash");
          break;
        case "manicurista":
          navigate("/userDash");
          break;
        default:
          navigate("/login");
      }
    }
  }, [isAuthenticated, user, navigate]);
  
  const onSubmit=handleSubmit(async(values:UserLogin)=>{
     await signin(values)
    })

  return (
    <form onSubmit={onSubmit}>
      <input type="text" {...register("email",{required:true})}/>
      <input type="password" {...register("password",{required:true})}/>
      <button>Login</button>
    </form>
  );
};

export default Login;
