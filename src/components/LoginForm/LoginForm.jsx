import { useForm } from "react-hook-form";
import { Button } from "../common/Button/Button";
import AuthFormContainer from "../AuthFormContainer/AuthFormContainer";
import Input from "../common/Input/Input";

export default function LoginForm({ onSubmit, isLoading, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <AuthFormContainer
      title="Login"
      onSubmit={handleSubmit(onSubmit)}
      footerText="Don't have an account?"
      footerLinkTo="/auth/register"
      footerLinkLabel="Register"
    >
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter email"
        register={register("email", {
          required: "Email is required",
        })}
        error={errors.email}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter password"
        register={register("password", {
          required: "Password is required",
        })}
        error={errors.password}
        showPasswordToggle
      />

      {error?.message && <p>{error.message}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </AuthFormContainer>
  );
}