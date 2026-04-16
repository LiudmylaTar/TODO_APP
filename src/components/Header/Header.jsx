import { Button } from "../common/Button/Button";
import { useNavigate } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={css.wrapper}>
      <div className={css.container}>
        <p onClick={() => navigate("/")}> ToDo.App</p>

        <p>Here you can plan your task</p>
        <div className={css.btnWrapper}>
          <Button className={css.btn} onClick={() => navigate("/auth/login")}>
            LogIn
          </Button>
          <Button
            className={css.btn}
            onClick={() => navigate("/auth/register")}
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Header;
