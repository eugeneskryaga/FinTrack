import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";
import { useAuth } from "../../../shared/hooks/useAuth";

import css from "../styles/RegisterForm.module.css";

export function RegisterForm() {
  const { register: registerAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerAuth(data);
  };

  return (
    <div className="container">
      <div className={css.title}>
        <h1>Create account</h1>
        <p>Start tracking your finances</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css.form}
      >
        <label>
          Name
          <input
            placeholder="Your name"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </label>

        <label>
          Email
          <input
            placeholder="you@example.com"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Minimum 8 characters"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </label>

        <button className={css.button}>Register</button>
      </form>
    </div>
  );
}
