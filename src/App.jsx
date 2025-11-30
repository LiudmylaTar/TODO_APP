import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { store } from "./redux/store";
import "./App.css";
import Container from "./components/Container/Container";
import Pagination from "./components/Pagination/Pagination";
import Form from "./components/TaskForm/Form";
import TodoList from "./components/TodoList/TodoList";
import { setPage } from "./redux/TODO/toDoSlice.js";
import { fetchToDo } from "./redux/TODO/operations";
import StatusFilter from "./components/StatusFilter/StatusFilter";
import {
  selectFilteredTodos,
  selectLimit,
  selectPage,
} from "./redux/TODO/selectors.js";
import Header from "./components/Header/Header.jsx";

function App() {
  const dispatch = useDispatch();

  const limit = useSelector(selectLimit);
  const page = useSelector(selectPage);
  const filtered = useSelector(selectFilteredTodos);
  const filteredTotal = filtered.length;
  const totalPages = Math.ceil(filteredTotal / limit);

  useEffect(() => {
    const state = store.getState().ToDo.items;

    if (state.length === 0) {
      dispatch(fetchToDo());
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
        <Form />
        <StatusFilter />
        <TodoList />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
          />
        )}
      </Container>
    </>
  );
}

export default App;
