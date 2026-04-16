import { Navigate, useParams } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default function AuthPage() {
  const { authType } = useParams();

  if (authType === "login") {
    return <LoginForm />;
  }

  if (authType === "register") {
    return <RegistrationForm />;
  }

  return <Navigate to="/auth/login" replace />;
}