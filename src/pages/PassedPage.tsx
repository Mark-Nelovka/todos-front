import TodoList from "components/TodoList/TodoList";
import Notiflix from "notiflix";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { getPassedTodos } from "redux/todos/todosOperations";
import ErrorPage from "./ErrorPage";
import Header from "components/Header/Header";
import Navigation from "components/Navigation/Navigation";
import Button from "ui/Button/Button";
import Modal from "components/Modal/Modal";
import PlusIcon from "assets/plus-icon.svg";

export default function PassedPage():JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todos = useAppSelector((state) => state.todos.data.data.todos.passed);
  const maxPage = useAppSelector(
    (state) => state.todos.data.data.pagination.maxPage.passed
  );
  const requestError = useAppSelector((state) => state.todos.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // If storage has already have todos and do or not request
    if (todos.length === 0) {
      dispatch(getPassedTodos({ offset: 0, limit: 10, page: 1 }));
    }
  }, []);

  useEffect(() => {
    // Catch error for notify
    if (requestError.statusCode) {
      Notiflix.Notify.warning(requestError.message);
    }
  }, [requestError]);

  const toggleModal = (e: React.MouseEvent): void => {
    const { dataset } = e.target as HTMLDivElement;
    if (dataset.backdrop === "true") {
      setIsModalOpen(!isModalOpen);
    }
  };

  const getNewTodo = (newPage: number) => {
    const limit = newPage * 10;
    dispatch(getPassedTodos({ offset: todos.length, limit, page: newPage }));
  };

  return (
    <>
      <Header />
      <Navigation />
      <div className="container">
        {requestError.statusCode && todos.length === 0 && <ErrorPage />}
        <TodoList
          getNewTodo={getNewTodo}
          maxPage={maxPage}
          isEmptyText="You haven't skipped any tasks"
          todos={[...todos]}
        />
      </div>
      <Button
        id="open-modal"
        type="button"
        dataValue="true"
        func={toggleModal}
        styles="button-toggle-form"
      >
        <img data-backdrop="true" src={PlusIcon} alt="Button for open create todo form" />
      </Button> 
      {isModalOpen && <Modal toggleFunc={toggleModal} />}
    </>
  );
}
