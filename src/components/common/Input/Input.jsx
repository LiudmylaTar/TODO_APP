import { useId, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import css from "./Input.module.css";

export default function Input({
  label,
  type = "text",
  placeholder,
  register,
  error,
  showPasswordToggle = false,
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    showPasswordToggle && showPassword ? "text" : type;

  return (
    <div className={css.field}>
      <label htmlFor={id} className={css.label}>
        {label}
      </label>

      <div className={css.inputWrapper}>
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={`${css.inputName} ${error ? css.inputError : ""}`}
          {...register}
        />

        {showPasswordToggle && (
          <button
            type="button"
            className={css.eyeButton}
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {error && <p className={css.error}>{error.message}</p>}
    </div>
  );
}