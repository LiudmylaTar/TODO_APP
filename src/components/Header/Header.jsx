import css from "./Header.module.css";
const Header = () => {
  return (
    <header className={css.wrapper}>
      <div className={css.container}>
        <p>ToDo.App</p>

        <p>Here you can plan your task</p>
      </div>
    </header>
  );
};
export default Header;
