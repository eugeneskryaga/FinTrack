import { LoginForm } from "../../features/auth/components/LoginForm";
import { Logo } from "../../shared/components/Logo/Logo";

export const LoginPage = () => {
  return (
    <main className="container">
      <Logo />
      <LoginForm />
    </main>
  );
};
