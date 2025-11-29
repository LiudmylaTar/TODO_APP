import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      forcePage={currentPage - 1} // React Paginate нумерує з 0
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      nextLabel="→"
      previousLabel="←"
    />
  );
};
export default Pagination;
