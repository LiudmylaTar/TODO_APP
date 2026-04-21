import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy, Suspense,} from "react";
import { refreshUser } from "./redux/auth/authOperation";
import { selectIsRefreshing } from "./redux/auth/selectors";
import Loader from "./components/Loader/Loader";

const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoumdPage"));
const ToDoPage = lazy(() => import("./pages/ToDoPage/ToDoPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
  return isRefreshing ? (<strong>Refreshing user...</strong>) : (
    <Suspense fallback={<div><Loader/></div>}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/:authType" element={<AuthPage />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <ToDoPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </Suspense>
  );
}

export default App;
