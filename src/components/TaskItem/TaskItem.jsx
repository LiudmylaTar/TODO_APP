import { RiDeleteBinLine } from "react-icons/ri";
import css from "./TaskItem.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteToDo, updateToDo } from "../../redux/TODO/operations";
import Selector from "../common/Selector/Selector";

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
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "done", label: "Done" },
  ];
  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

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
        <Selector
          id={statusSelectId}
          label="Status"
          options={statusOptions}
          value={item.status}
          onChange={handleStatusChange}
          className={css.selector}
        />
      </div>
      <div className={css.status}>
        <Selector
          id={prioritySelectId}
          label="Priority"
          options={priorityOptions}
          value={item.priority}
          onChange={handlePriorityChange}
          className={css.selector}
          fieldClassName={css[item.priority] ?? ""}
        />
      </div>
    </li>
  );
};

export default TaskItem;
