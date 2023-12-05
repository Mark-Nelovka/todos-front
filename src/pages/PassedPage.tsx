import TodoList from "components/TodoList/TodoList";
import Pagination from "components/pagination/Pagination";
import Notiflix from "notiflix";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { getAllTodos } from "redux/todos/todosOperations";
import ErrorPage from "./ErrorPage";
import Header from "components/Header/Header";
import Navigation from "components/Navigation/Navigation";
import Button from "ui/Button/Button";
import Modal from "components/Modal/Modal";
import PlusIcon from "assets/plus-icon.svg";

export default function PassedPage(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todos = useAppSelector((state) => state.todos.data.data.todos);
  const requestError = useAppSelector((state) => state.todos.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTodos({ page: 1, currentPage: "passed" }));
  }, []);

  useEffect(() => {
    if (requestError.statusCode) {
      Notiflix.Notify.warning(requestError.message);
    }
  }, [requestError]);

  const changePage = (page: number) => {
    dispatch(getAllTodos({ page: page, currentPage: "passed" }));
  };

  const toggleModal = (e: React.MouseEvent): void => {
    const { dataset } = e.target as HTMLDivElement;
    if (dataset.backdrop === "true") {
      setIsModalOpen(!isModalOpen);
    }
  };

  return (
    <>
      <Header />
      <Navigation />
      <div className="container">
        {requestError.statusCode && todos.length === 0 && <ErrorPage />}
        <TodoList todos={todos} isEmptyText="You haven't skipped any tasks" />
        {todos.length > 0 && <Pagination changePageFunc={changePage} />}
      </div>
      <Button
        id="open-modal"
        type="button"
        dataValue="true"
        func={toggleModal}
        styles="button-toggle-form"
      >
        <img
          data-backdrop="true"
          src={PlusIcon}
          alt="Button for open create todo form"
        />
      </Button>
      {isModalOpen && <Modal toggleFunc={toggleModal} />}
    </>
  );
}
