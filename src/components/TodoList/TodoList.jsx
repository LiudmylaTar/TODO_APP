import css from "./TodoList.module.css";
import TaskItem from "../TaskItem/TaskItem";
import { useSelector } from "react-redux";

import Loader from "../Loader/Loader";
import { selectPaginatedTodos } from "../../redux/TODO/selectors";

const TodoList = () => {
  const items = useSelector(selectPaginatedTodos);
  const isLoading = useSelector((state) => state.ToDo.isLoading);
  const error = useSelector((state) => state.ToDo.error);
  const currentPage = useSelector((state) => state.ToDo.page);
  const limit = useSelector((state) => state.ToDo.limit);

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!items.length) return <p>No tasks yet</p>;
  return (
    <ul className={css.list}>
      {items.map((item, index) => (
        <TaskItem
          key={item.id}
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
