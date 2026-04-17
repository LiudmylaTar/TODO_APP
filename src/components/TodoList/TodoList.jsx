import css from "./TodoList.module.css";
import TaskItem from "../TaskItem/TaskItem";
import { useSelector } from "react-redux";

import Loader from "../Loader/Loader";
import {
  selectTodos,
  selectTodoLoading,
  selectTodoError,
} from "../../redux/TODO/selectors";

const TodoList = () => {
  const items = useSelector(selectTodos);
  const isLoading = useSelector(selectTodoLoading);
  const error = useSelector(selectTodoError);
  const currentPage = useSelector((state) => state.ToDo.page);
  const limit = useSelector((state) => state.ToDo.limit);

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!items.length) return <p>No tasks yet</p>;
  return (
    <ul className={css.list}>
      {items.map((item, index) => (
        <TaskItem
          key={item._id}
          item={item}
          index={index}
          page={currentPage}
          limit={limit}
        />
      ))}
    </ul>
  );
};

export default TodoList;
