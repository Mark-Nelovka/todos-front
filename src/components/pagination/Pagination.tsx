import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { updatePage } from "redux/todos/todosOperations";
import Button from "ui/Button/Button";
import Notiflix from "notiflix";
import ArrowIcon from "assets/arrow-left-icon.svg";

export default function Pagination({
  changePageFunc,
  maxPage,
}: {
  changePageFunc: (page: number) => void;
  maxPage: number;
}): JSX.Element {
  const pageFromBackend = useAppSelector(
    (state) => state.todos.data.data.pagination.page
  );
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(5);
  const [allPageNumber, setAllPageNumber] = useState<number[]>([]);

  const [activePage, setActivePage] = useState(pageFromBackend);
  const dispatch = useAppDispatch();

  const changePage = (e: React.MouseEvent) => {
    const { id } = e.target as HTMLLIElement;
    // Checking if we go to the last page and we need re-render layout for pagination
    if (+id === allPageNumber.length && allPageNumber.length > 6) {
      setFirstIndex(allPageNumber.length - 7);
      setLastIndex(allPageNumber.length - 2);
    }
    if (id) {
      changePageFunc(+id);
    }
  };

  useEffect(() => {
    setActivePage(pageFromBackend);
  }, [pageFromBackend]);

  useEffect(() => {
    const savePagesForPagination = [];
    for (let i = 1; i < maxPage + 1; i += 1) {
      savePagesForPagination.push(i);
    }
    if (
      savePagesForPagination.length > 0 &&
      savePagesForPagination.length < 7
    ) {
      setFirstIndex(0);
      setLastIndex(6);
      setAllPageNumber(savePagesForPagination);
      dispatch(updatePage(1));
      return;
    }
    setAllPageNumber(savePagesForPagination);
    setFirstIndex(0);
    setLastIndex(5);
    dispatch(updatePage(1));
  }, [maxPage]);

  const nextPage = (newPage: number) => {
    if (newPage === maxPage + 1) {
      Notiflix.Notify.info("This is last page");
      return;
    }
    changePageFunc(newPage);
    if (allPageNumber.length < 7) {
      setLastIndex(6);
      return;
    }
    if (
      newPage === allPageNumber.length - 4 ||
      activePage >= allPageNumber.length - 4
    ) {
      setFirstIndex(allPageNumber.length - 7);
      setLastIndex(allPageNumber.length - 2);
      return;
    }
    if (activePage >= 3) {
      setFirstIndex(allPageNumber[activePage] - 3);
      setLastIndex(allPageNumber[activePage] + 2);
    }
  };

  const prevPage = (newPage: number) => {
    if (activePage === 1) {
      Notiflix.Notify.info("This is first page");
      return;
    }
    changePageFunc(newPage);
    if (allPageNumber.length < 7) {
      setLastIndex(6);
      return;
    }
    if (activePage <= 3) {
      setFirstIndex(0);
      setLastIndex(5);
      return;
    }
    if (newPage <= allPageNumber.length - 4) {
      setFirstIndex(allPageNumber[activePage] - 5);
      setLastIndex(allPageNumber[activePage]);
      return;
    }
  };

  return (
    <div className="pagination__container">
      <div className="pagination__elements-container">
        <div>
          <Button
            type="button"
            styles="pagination__elements-button_prev"
            id="button-prev-page"
            func={() => prevPage(activePage - 1)}
          >
            <img src={ArrowIcon} alt="button previosly page" />
          </Button>
        </div>
        <ul onClick={changePage} className="pagination__list">
          {allPageNumber.slice(firstIndex, lastIndex).map((el) => (
            <li key={el} id={`${el}`} className={activePage === el ? "active" : ""}>
              {el}
            </li>
          ))}
          {activePage === allPageNumber.length - 2 ||
          activePage >= allPageNumber.length - 2
            ? allPageNumber.length > 6 && (
                <li
                  id={`${allPageNumber.length - 1}`}
                  className={
                    activePage === allPageNumber.length - 1 ? "active" : ""
                  }
                >
                  {allPageNumber.length - 1}
                </li>
              )
            : allPageNumber.length > 6 && (
                <li
                  className={
                    activePage === allPageNumber.length - 1 ? "active" : ""
                  }
                >
                  ...
                </li>
              )}
          {allPageNumber.length > 6 && (
            <li
              id={`${allPageNumber.length}`}
              className={activePage === allPageNumber.length ? "active" : ""}
            >
              {maxPage}
            </li>
          )}
        </ul>
        <Button
          type="button"
          styles="pagination__elements-button_next"
          id="button-prev-page"
          func={() => nextPage(activePage + 1)}
        >
          <img src={ArrowIcon} alt="button previosly page" />
        </Button>
      </div>
    </div>
  );
}
