import { useDispatch, useSelector } from "react-redux";
import { Button } from "../common/Button/Button";
import { setStatusFilter } from "../../redux/TODO/filtersSlice";
import css from "./StatusFilter.module.css";
import { setPage } from "../../redux/TODO/toDoSlice";

const StatusFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.status);
  const handleFilterChange = (filter) => {
    dispatch(setStatusFilter(filter));
    dispatch(setPage(1));
  };
  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Filter by status</h3>
      <div className={css.container}>
        <Button
          selected={filter === "all"}
          onClick={() => handleFilterChange("all")}
        >
          All
        </Button>
        <Button
          selected={filter === "pending"}
          onClick={() => handleFilterChange("pending")}
        >
          Pending
        </Button>
        <Button
          selected={filter === "done"}
          onClick={() => handleFilterChange("done")}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default StatusFilter;
