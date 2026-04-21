import Pagination from "../../components/Pagination/Pagination";
import Form from "../../components/TaskForm/Form";
import TodoList from "../../components/TodoList/TodoList";
import StatusFilter from "../../components/StatusFilter/StatusFilter";
import SortFilter from "../../components/SortFilter/SortFilter.jsx";
import { useTodosQuery } from "../../hooks/useTodosQuery";
import css from "./ToDoPage.module.css";

export default function ToDoPage() {
  const { page, totalPages, onPageChange } = useTodosQuery();
  return (
    <>
      <Form />
      <div className={css.filters_wrapper}>
        <StatusFilter />
        <SortFilter />
      </div>
      <TodoList />
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
