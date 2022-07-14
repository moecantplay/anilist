import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";

const Pagination = ({ onPageChange, pageCount, currentPage }) => {
  const Wrapper = styled.div`
    width: 100%;

    .pagination {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      list-style: none;
      margin: 8px auto 0;
      padding: 0;
    }

    .pagination__child {
      width: 40px;
      height: 40px;
      color: #333;
      background-color: #fff;
      border: 1px solid #eee;
      cursor: pointer;
      padding: 0;
      margin: 0 0 8px 0;

      &:not(:last-child) {
        margin-right: 8px;
      }

      &:disabled {
        pointer-events: none;
        color: #ababab;
        background-color: #eee;
      }

      &:hover,
      &.selected {
        border-color: #333;
      }

      &.selected {
        pointer-events: none;
      }
    }

    .pagination__link {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 0.875rem;
      line-height: 1;

      & > svg {
        display: block;
      }
    }

    @media (min-width: 992px) {
      .pagination {
        margin-top: 12px;
      }

      .pagination__child {
        width: 50px;
        height: 50px;
        margin-bottom: 12px;

        &:not(:last-child) {
          margin-right: 12px;
        }
      }

      .pagination__link {
        font-size: 1rem;
      }
    }
  `;

  return (
    <Wrapper>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRight />}
        previousLabel={<ChevronLeft />}
        containerClassName="pagination"
        pageClassName="pagination__child"
        previousClassName="pagination__child pagination__child--prev"
        nextClassName="pagination__child pagination__child--next"
        pageLinkClassName="pagination__link"
        previousLinkClassName="pagination__link pagination__link--prev"
        nextLinkClassName="pagination__link pagination__link--next"
        breakClassName="pagination__child pagination__child--break"
        breakLinkClassName="pagination__link pagination__link--link"
        disabledClassName="pagination__child pagination__child--disabled"
        disabledLinkClassName="pagination__link pagination__link--disabled"
        renderOnZeroPageCount={null}
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        initialPage={currentPage}
        onPageChange={({ selected }) => onPageChange(selected)}
        hrefBuilder={(page, pageCount, selected) =>
          page >= 1 && page <= pageCount ? `?page=${page}` : "#"
        }
        hrefAllControls
      />
    </Wrapper>
  );
};

export default Pagination;
