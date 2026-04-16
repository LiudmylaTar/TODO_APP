import { NavLink } from "react-router-dom";
import css from "./AuthFormContainer.module.css";

export default function AuthFormContainer({
  title,
  onSubmit,
  children,
  footerText,
  footerLinkTo,
  footerLinkLabel,
}) {
  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>{title}</h1>
      <form onSubmit={onSubmit} className={css.form}>
        {children}
      </form>
      <p className={css.footer}>
        {footerText}
        <NavLink to={footerLinkTo} className={css.linkPrimary}>
          {footerLinkLabel}
        </NavLink>
      </p>
    </div>
  );
}
