import { RegisterForm } from "../../features/auth/components/RegisterForm";
import { Logo } from "../../shared/components/Logo/Logo";

export const RegisterPage = () => {
  return (
    <main className="container">
      <Logo />
      <RegisterForm />
    </main>
  );
};
