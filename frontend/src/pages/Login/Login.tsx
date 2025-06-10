import {useForm} from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

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
   <div className="login">
      <form className="login__form" onSubmit={onSubmit}>
        <h1 className="login__title">Welcome Back</h1>
        <p className="login__subtitle">Login to your account</p>
        <div className="login__input">
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Email"
          />
        </div>
        <div className="login__input">
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login__submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
