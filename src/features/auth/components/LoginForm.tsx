import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { AuthForm } from "./AuthForm/AuthForm";

import { loginSchema, type LoginSchema } from "../schemas/login.schema";

import { useAuth } from "../../../shared/hooks/useAuth";

export function LoginForm() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginSchema) => {
    await login(data.email, data.password);
    navigate("/", { replace: true });
  };

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Log in to continue"
      buttonText="Login"
      redirectText="Don't have an account?"
      redirectLinkText="Register"
      redirectTo="/register"
      resolver={zodResolver(loginSchema)}
      onSubmit={onSubmit}
    />
  );
}
