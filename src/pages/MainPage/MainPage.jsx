import { useState } from "react";
import { Button } from "../../components/common/Button/Button";
import GetStartedModal from "../../components/GetStartedModal/GetStartedModal";
import css from "./MainPage.module.css";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
const handleGetStarted = () => {
  if (isLoggedIn) {
    navigate("/tasks");
  } else {
    setIsModalOpen(true);
  }
};
  return (
    <>
      <section className={css.hero}>
      <div className={css.leftSide}>
        <div className={css.titelWrapper}>
          <h1 className={css.titel}>Make Life Easier</h1>
          <p className={css.slogan}>
            Plan Do Act
          </p>
        </div>
        <Button
          className={css.startBtn}
          onClick={handleGetStarted}
        >
          Get started{" "}
        </Button>
      </div>
      <div className={css.rightSide}>
        
          <div className={css.imgWrapper}>
          <img
            src="/heroPlan.jpg"
            alt="Planning and organization"
          />
          </div>
        
      </div>
      </section>
      {isModalOpen && <GetStartedModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}