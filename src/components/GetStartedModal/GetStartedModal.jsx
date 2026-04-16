import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button/Button";
import css from "./GetStartedModal.module.css";

export default function GetStartedModal({ onClose }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <Modal
      title="Welcome to ToDo.App!"
      message="To get started, please log in or sign up to manage your tasks effectively."
      onClose={onClose}
    >
      <div className={css.btnWrapper}>
        <Button className={css.btn} onClick={() => handleNavigate("/auth/login")}>
          LogIn
        </Button>
        <Button
          className={css.btn}
          onClick={() => handleNavigate("/auth/register")}
        >
          Register
        </Button>
      </div>
    </Modal>
  );
}