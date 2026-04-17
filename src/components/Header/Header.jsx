import { Button } from "../common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "../../redux/auth/authOperation";
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectUser,
} from "../../redux/auth/selectors";
import css from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  const handleLogout = async () => {
    await dispatch(fetchLogout());
    navigate("/", { replace: true });
  };

  return (
    <header className={css.wrapper}>
      <div className={css.container}>
        <p onClick={() => navigate("/")}> ToDo.App</p>
        {isLoggedIn ? (
          <p onClick={() => navigate("/tasks")}>Tasks</p>
        ) : (
          <p>Here you can plan your task</p>
        )}

        <div className={css.btnWrapper}>
          {isLoggedIn ? (
            <>
              <p>{user?.name ?? "User"}</p>
              <Button
                className={css.btn}
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? "Logging out..." : "LogOut"}
              </Button>
            </>
          ) : (
            <>
              <Button
                className={css.btn}
                onClick={() => navigate("/auth/login")}
              >
                LogIn
              </Button>
              <Button
                className={css.btn}
                onClick={() => navigate("/auth/register")}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
