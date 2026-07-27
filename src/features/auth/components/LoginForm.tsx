import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "./AuthForm/AuthForm";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";
import { useAuth } from "../../../shared/hooks/useAuth";
import type { UseFormSetError } from "react-hook-form";
import { FirebaseError } from "firebase/app";

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (
    data: LoginSchema,
    setError: UseFormSetError<LoginSchema>,
  ) => {
    try {
      await login(data.email, data.password);
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError("root", {
          type: "manual",
          message: "Wrong credentials",
        });
      }
    }
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
};
