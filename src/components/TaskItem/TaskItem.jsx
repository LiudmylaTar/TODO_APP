import { RiDeleteBinLine } from "react-icons/ri";
import css from "./TaskItem.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteToDo, updateToDo } from "../../redux/TODO/operations";

const TaskItem = ({ item, index, page, limit }) => {
  const dispatch = useDispatch();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(item.title ?? "");

  useEffect(() => {
    setTitleDraft(item.title ?? "");
  }, [item.title]);

  const handleDelete = () => {
    dispatch(deleteToDo(item._id));
  };

  const handleStatusChange = (event) => {
    dispatch(
      updateToDo({
        id: item._id,
        changes: { status: event.target.value },
      })
    );
  };

  const handlePriorityChange = (event) => {
    dispatch(
      updateToDo({
        id: item._id,
        changes: { priority: event.target.value },
      })
    );
  };

  const saveTitle = () => {
    const trimmedTitle = titleDraft.trim();

    if (!trimmedTitle) {
      setTitleDraft(item.title ?? "");
      setIsEditingTitle(false);
      return;
    }

    if (trimmedTitle !== item.title) {
      dispatch(
        updateToDo({
          id: item._id,
          changes: { title: trimmedTitle },
        })
      );
    }

    setIsEditingTitle(false);
  };

  const globalIndex = (page - 1) * limit + index + 1;
  const fieldSuffix = item._id ?? globalIndex;
  const titleInputId = `todo-title-${fieldSuffix}`;
  const statusSelectId = `todo-status-${fieldSuffix}`;
  const prioritySelectId = `todo-priority-${fieldSuffix}`;

  return (
    <li className={css.box}>
      <h3 className={css.title}>TODO #{globalIndex}</h3>
      {isEditingTitle ? (
        <input
          id={titleInputId}
          name="title"
          className={css.titleInput}
          type="text"
          value={titleDraft}
          onChange={(event) => setTitleDraft(event.target.value)}
          onBlur={saveTitle}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              saveTitle();
            }
          }}
          autoFocus
        />
      ) : (
        <p className={css.text} onClick={() => setIsEditingTitle(true)}>
          {item.title}
        </p>
      )}
      <button type="button" className={css.deleteButton} onClick={handleDelete}>
        <RiDeleteBinLine size={24} />
      </button>
      <div className={css.status}>
        <p>Status</p>
        <select
          id={statusSelectId}
          name="status"
          className={css.select}
          value={item.status}
          onChange={handleStatusChange}
        >
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className={css.status}>
        <p>Priority</p>
        <select
          id={prioritySelectId}
          name="priority"
          className={css.select}
          data-priority={item.priority}
          value={item.priority}
          onChange={handlePriorityChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </li>
  );
};

export default TaskItem;
