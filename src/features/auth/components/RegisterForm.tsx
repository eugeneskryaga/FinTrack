import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { AuthForm } from "./AuthForm/AuthForm";

import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";

import { useAuth } from "../../../shared/hooks/useAuth";

export function RegisterForm() {
  const { register } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterSchema) => {
    await register(data);

    navigate("/", { replace: true });
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
}
