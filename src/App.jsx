import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import Container from "./components/Container/Container";
import Pagination from "./components/Pagination/Pagination";
import Form from "./components/TaskForm/Form";
import TodoList from "./components/TodoList/TodoList";
import { setPage } from "./redux/TODO/toDoSlice.js";
import { fetchToDo } from "./redux/TODO/operations";
import StatusFilter from "./components/StatusFilter/StatusFilter";
import { selectFilteredTodos } from "./redux/TODO/selectors";

function App() {
  const dispatch = useDispatch();

  const limit = useSelector((state) => state.ToDo.limit);
  const page = useSelector((state) => state.ToDo.page);

  const filteredTotal = useSelector(
    (state) => selectFilteredTodos(state).length
  );
  const totalPages = Math.ceil(filteredTotal / limit);

  useEffect(() => {
    dispatch(fetchToDo());
  }, [dispatch]);

  return (
    <>
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
