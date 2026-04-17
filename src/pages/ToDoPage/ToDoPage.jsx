import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import Form from "../../components/TaskForm/Form";
import TodoList from "../../components/TodoList/TodoList";
import { setPage } from "../../redux/TODO/toDoSlice.js";
import StatusFilter from "../../components/StatusFilter/StatusFilter";
import { fetchToDo } from "../../redux/TODO/operations";
import {
  selectLimit,
  selectPage,
  selectStatusFilter,
  selectSearchFilter,
  selectSortBy,
  selectSortOrder,
  selectTotalPages,
} from "../../redux/TODO/selectors.js";

export default function ToDoPage() {
  const dispatch = useDispatch();

  const limit = useSelector(selectLimit);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const status = useSelector(selectStatusFilter);
  const search = useSelector(selectSearchFilter);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  useEffect(() => {
    dispatch(fetchToDo());
  }, [dispatch, page, limit, status, search, sortBy, sortOrder]);
  return (
    <>
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
    </>
  );
}