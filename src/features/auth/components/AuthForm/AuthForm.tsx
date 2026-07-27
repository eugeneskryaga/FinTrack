import {
  useForm,
  type FieldValues,
  type Path,
  type Resolver,
  type UseFormSetError,
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
  onSubmit: (data: T, setError: UseFormSetError<T>) => Promise<void>;
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
    setError,
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
        onSubmit={handleSubmit(data => onSubmit(data, setError))}
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
        {errors.root && (
          <p className={`${css.error} ${css.root_error}`}>
            {errors.root.message as string}
          </p>
        )}
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
