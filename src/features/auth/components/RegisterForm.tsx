import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";
import { useAuth } from "../../../shared/hooks/useAuth";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Name"
        {...register("name")}
      />

      <p>{errors.name?.message}</p>

      <input
        placeholder="Email"
        {...register("email")}
      />

      <p>{errors.email?.message}</p>

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      <p>{errors.password?.message}</p>

      <button>Register</button>
    </form>
  );
}
