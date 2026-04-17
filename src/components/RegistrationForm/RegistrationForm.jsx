import { useForm } from "react-hook-form";
import { Button } from "../common/Button/Button";
import AuthFormContainer from "../AuthFormContainer/AuthFormContainer";
import Input from "../common/Input/Input";

export default function RegistrationForm({ onSubmit, isLoading, error }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <AuthFormContainer
      title="Register"
      onSubmit={handleSubmit(onSubmit)}
      footerText="Already have an account?"
      footerLinkTo="/auth/login"
      footerLinkLabel="Login"
    >
      <Input
        label="Name"
        name="name"
        type="text"
        placeholder="Enter name"
        register={register("name", {
          required: "Name is required",
        })}
        error={errors.name}
      />
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