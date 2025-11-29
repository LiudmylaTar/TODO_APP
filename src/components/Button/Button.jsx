import clsx from "clsx";
import css from "./Button.module.css";

export const Button = ({
  selected = false,
  type = "button",
  children,
  className,
  ...otherProps
}) => {
  return (
    <button
      className={clsx(css.btn, className, { [css.isSelected]: selected })}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
};
