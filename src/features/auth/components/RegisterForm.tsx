import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "./AuthForm/AuthForm";
import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";
import { useAuth } from "../../../shared/hooks/useAuth";
import { FirebaseError } from "firebase/app";
import type { UseFormSetError } from "react-hook-form";

export const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (
    data: RegisterSchema,
    setError: UseFormSetError<RegisterSchema>,
  ) => {
    try {
      await register(data);
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("email", {
              type: "manual",
              message: "Email already exists",
            });
            break;

          default:
            setError("root", {
              type: "manual",
              message: "Auth error",
            });
        }
      }
    }
  };

  return (
    <AuthForm
      title="Create account"
      subtitle="Start tracking your finances"
      buttonText="Register"
      redirectText="Already registered?"
      redirectLinkText="Login"
      redirectTo="/login"
      showNameField
      resolver={zodResolver(registerSchema)}
      onSubmit={onSubmit}
    />
  );
};
