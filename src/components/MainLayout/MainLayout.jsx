import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Container from "../Container/Container";
import css from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={css.root}>
      <Header />
      <main className={css.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default MainLayout;
