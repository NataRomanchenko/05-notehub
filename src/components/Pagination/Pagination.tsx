import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export default function Pagination({
  pageCount,
  onPageChange,
  currentPage,
}: PaginationProps) {
  return (
    <ReactPaginate.default
      pageCount={Math.min(pageCount, 10)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={(event: { selected: number }) =>
        onPageChange(event.selected + 1)
      }
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.page}
      previousLabel="←"
      nextLabel="→"
    />
  );
}