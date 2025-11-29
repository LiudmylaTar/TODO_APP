import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import css from "./TaskItem.module.css";
import { useDispatch } from "react-redux";
import { deleteToDo, toggleCompleted } from "../../redux/TODO/operations";

const TaskItem = ({ item, index, page, limit }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteToDo(item.id));
  };
  const handleToggle = () => {
    dispatch(
      toggleCompleted({
        id: item.id,
        completed: !item.completed,
      })
    );
  };
  const globalIndex = (page - 1) * limit + index + 1;

  return (
    <li className={css.box}>
      <h3 className={css.title}>TODO #{globalIndex}</h3>
      <p className={css.text}>{item.title}</p>
      <button type="button" className={css.deleteButton} onClick={handleDelete}>
        <RiDeleteBinLine size={24} />
      </button>
      <div className={css.status}>
        <p>Is complate</p>
        <input
          type="checkbox"
          className={css.checkbox}
          checked={item.completed}
          onChange={handleToggle}
        />
      </div>
    </li>
  );
};

export default TaskItem;
