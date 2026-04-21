import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToDo } from "../redux/TODO/operations";
import {
  selectPage,
  selectTodosQueryParams,
  selectTotalPages,
} from "../redux/TODO/selectors";
import { setPage } from "../redux/TODO/toDoSlice";

export const useTodosQuery = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const queryParams = useSelector(selectTodosQueryParams);

  useEffect(() => {
    dispatch(fetchToDo());
  }, [dispatch, queryParams]);

  const onPageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  return { page, totalPages, onPageChange };
};
