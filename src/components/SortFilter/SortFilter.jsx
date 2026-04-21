import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/TODO/toDoSlice";
import { selectSortBy, selectSortOrder } from "../../redux/TODO/selectors";
import { setSorting } from "../../redux/TODO/filtersSlice";
import Selector from "../common/Selector/Selector";
import css from "./SortFilter.module.css";

const SortFilter = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const sortByOptions = [
    { value: "createdAt", label: "Created At" },
    { value: "title", label: "Title" },
    { value: "priority", label: "Priority" },
  ];
  const sortOrderOptions = [
    { value: "desc", label: "DESC" },
    { value: "asc", label: "ASC" },
  ];

  const handleSortByChange = (e) => {
    dispatch(
      setSorting({
        sortBy: e.target.value,
        sortOrder,
      })
    );
    dispatch(setPage(1));
  };

  const handleSortOrderChange = (e) => {
    dispatch(
      setSorting({
        sortBy,
        sortOrder: e.target.value,
      })
    );
    dispatch(setPage(1));
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Sort tasks by:</h3>
      <div className={css.controls}>
        <Selector
          options={sortByOptions}
          value={sortBy}
          onChange={handleSortByChange}
          className={css.selector}
        />
       
        <Selector
        label={'with order:'}
          options={sortOrderOptions}
          value={sortOrder}
          onChange={handleSortOrderChange}
          className={css.selector}
        />
      </div>
    </div>
  );
};

export default SortFilter;
