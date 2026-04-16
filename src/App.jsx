import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoumdPage";
import ToDoPage from "./pages/ToDoPage/ToDoPage";

import "./App.css";

function App() {
  return (
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
  );
}

export default App;
