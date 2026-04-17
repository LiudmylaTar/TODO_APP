import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { fetchLogin, fetchRegister } from "../../redux/auth/authOperation";
import {
  selectError,
  selectIsLoading,
  selectIsLoggedIn,
} from "../../redux/auth/selectors";

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authType } = useParams();
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const handleLogin = async (data) => {
    const resultAction = await dispatch(fetchLogin(data));
    if (fetchLogin.fulfilled.match(resultAction)) {
      navigate("/tasks", { replace: true });
    }
  };

  const handleRegister = async (data) => {
    const resultAction = await dispatch(fetchRegister(data));
    if (fetchRegister.fulfilled.match(resultAction)) {
      navigate("/auth/login", { replace: true });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  if (authType === "login") {
    return <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />;
  }

  if (authType === "register") {
    return (
      <RegistrationForm onSubmit={handleRegister} isLoading={isLoading} error={error} />
    );
  }

  return <Navigate to="/auth/login" replace />;
}