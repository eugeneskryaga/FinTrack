import {
  useForm,
  type FieldValues,
  type Path,
  type Resolver,
} from "react-hook-form";
import { Link } from "react-router-dom";

import css from "./AuthForm.module.css";

interface AuthFormProps<T extends FieldValues> {
  title: string;
  subtitle: string;

  buttonText: string;

  redirectText: string;
  redirectLinkText: string;
  redirectTo: string;

  showNameField?: boolean;

  resolver: Resolver<T>;

  onSubmit: (data: T) => Promise<void>;
}

export function AuthForm<T extends FieldValues>({
  title,
  subtitle,
  buttonText,
  redirectText,
  redirectLinkText,
  redirectTo,
  showNameField = false,
  resolver,
  onSubmit,
}: AuthFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver,
  });

  return (
    <>
      <div className={css.title}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css.form}
      >
        {showNameField && (
          <label>
            Name
            <input
              placeholder="Your name"
              {...register("name" as Path<T>)}
            />
            <p className={css.error}>{errors.name?.message as string}</p>
          </label>
        )}

        <label>
          Email
          <input
            placeholder="you@example.com"
            {...register("email" as Path<T>)}
          />
          <p className={css.error}>{errors.email?.message as string}</p>
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Minimum 8 characters"
            {...register("password" as Path<T>)}
          />
          <p className={css.error}>{errors.password?.message as string}</p>
        </label>

        <button className={css.button}>{buttonText}</button>
      </form>

      <div className={css.redirect}>
        <p>{redirectText}</p>

        <Link
          to={redirectTo}
          className={css.redirect_link}
        >
          {redirectLinkText}
        </Link>
      </div>
    </>
  );
}
