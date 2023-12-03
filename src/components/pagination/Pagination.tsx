import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/hook";
import Button from "ui/Button/Button";
import ArrowIcon from "assets/arrow-left-icon.svg";
import Notiflix from "notiflix";

export default function Pagination({
  changePageFunc,
}: {
  changePageFunc: (page: number) => void;
}): JSX.Element {
  const [activePage, setActivePage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(5);
  const [allPageNumber, setAllPageNumber] = useState<number[]>([]);

  const countItems = useAppSelector(
    (state) => state.todos.data.data.countTodos
  );

  const changePage = (e: React.MouseEvent) => {
    const { id } = e.target as HTMLLIElement;
    if (+id === allPageNumber.length && allPageNumber.length > 6) {
      setFirstIndex(allPageNumber.length - 7);
      setLastIndex(allPageNumber.length - 2);
    }
    if (id) {
      setActivePage(+id);
      changePageFunc(+id);
    }
  };

  useEffect(() => {
    const arrForPageCount = [];
    for (let i = 1; i < Math.ceil(countItems / 10) + 1; i += 1) {
      arrForPageCount.push(i);
    }
    if (arrForPageCount.length > 0 && arrForPageCount.length < 7) {
      setFirstIndex(0);
      setLastIndex(6);
      setAllPageNumber(arrForPageCount);
      return;
    }
    setAllPageNumber(arrForPageCount);
    setFirstIndex(0);
    setLastIndex(5);
  }, [countItems]);

  const nexPage = () => {
    if (activePage + 1 === Math.ceil(countItems / 10) + 1) {
      Notiflix.Notify.info("This is last page");
      return;
    }
    changePageFunc(activePage + 1);
    setActivePage((prevState) => prevState + 1);
    if (allPageNumber.length < 7) {
      setLastIndex(6);
      return;
    }

    if (
      activePage + 1 === allPageNumber.length - 4 ||
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

  const prevPage = () => {
    if (activePage === 1) {
      Notiflix.Notify.info("This is first page");
      return;
    }
    changePageFunc(activePage - 1);
    setActivePage((prevState) => prevState - 1);
    if (allPageNumber.length < 7) {
      setLastIndex(6);
      return;
    }
    if (activePage <= 3) {
      setFirstIndex(0);
      setLastIndex(5);
      return;
    }
    if (activePage - 1 <= allPageNumber.length - 4) {
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
            func={prevPage}
          >
            <img src={ArrowIcon} alt="button previosly page" />
          </Button>
        </div>
        <ul onClick={changePage} className="pagination__list">
          {allPageNumber.slice(firstIndex, lastIndex).map((el) => (
            <li id={`${el}`} className={activePage === el ? "active" : ""}>
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
              {allPageNumber.length}
            </li>
          )}
        </ul>
        <Button
          type="button"
          styles="pagination__elements-button_next"
          id="button-prev-page"
          func={nexPage}
        >
          <img src={ArrowIcon} alt="button previosly page" />
        </Button>
      </div>
    </div>
  );
}
