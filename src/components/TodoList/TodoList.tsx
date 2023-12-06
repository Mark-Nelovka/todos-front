import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { updatePage } from "redux/todos/todosOperations";
import EmptyPage from "pages/EmptyPage";
import Modal from "components/Modal/Modal";
import Todo from "components/Todo/Todo";
import Pagination from "components/pagination/Pagination";
import { Loader } from "ui/Loader/Loader";
import { TTodo, TTodoPayload } from "redux/todos/types";

interface IPropsTodoList {
  todos: TTodo[];
  isEmptyText: string;
  maxPage: number;
  getNewTodo: (p: number) => void;
}

export default function TodoList({
  todos,
  isEmptyText,
  maxPage,
  getNewTodo,
}: IPropsTodoList): JSX.Element {
  const pageFromBackend = useAppSelector(
    (state) => state.todos.data.data.pagination.page
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const [todoForUpdateForm, setTodoForUpdateForm] = useState<TTodoPayload>();

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.todos.isLoading);

  useEffect(() => {
    setFirstIndex(activePage * 10 - 10);
    setLastIndex(activePage * 10);
  }, [activePage]);

  useEffect(() => {
    setActivePage(pageFromBackend);
  }, [pageFromBackend]);

  const changePage = (page: number) => {
    if (activePage === page) {
      return;
    }
    if (page < activePage) {
      dispatch(updatePage(page));
      return;
    }
    if (todos.length >= page * 10) {
      dispatch(updatePage(page));
      return;
    }
    if (Math.ceil(todos.length / 10) === page) {
      dispatch(updatePage(page));
      return;
    }
    getNewTodo(page);
    dispatch(updatePage(page));
  };

  const toggleModal = (e: React.MouseEvent): void => {
    const { dataset, id } = e.target as HTMLDivElement;
    const findTodo = todos.find((it) => it.id === +id);
    // If we clicked to UPDATE button in todo so we push data for autofill FORM
    if (findTodo) {
      setTodoForUpdateForm(() => ({
        ...findTodo,
        deadline: new Date(findTodo.deadline),
      }));
    }
    if (dataset.backdrop === "true") {
      setIsModalOpen(!isModalOpen);
    }
  };

  return (
    <>
      <div className="todo__container">
        {isLoading && <Loader />}
        {!isLoading && todos.length > 0 && (
          <ul className="todo__list">
            {todos
              .sort((a, b) => b.id - a.id)
              .slice(firstIndex, lastIndex)
              .map((todo) => (
                <Todo todo={todo} toggleFunc={toggleModal} />
              ))}
          </ul>
        )}
        {!isLoading && todos.length === 0 && (
          <EmptyPage message={isEmptyText} />
        )}
        {isModalOpen && (
          <Modal todoForUpdate={todoForUpdateForm} toggleFunc={toggleModal} />
        )}
      </div>
      <Pagination maxPage={maxPage} changePageFunc={changePage} />
    </>
  );
}
