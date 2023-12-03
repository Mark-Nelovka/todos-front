import Modal from "components/Modal/Modal";
import Todo from "components/Todo/Todo";
import React, { useState } from "react";
import { Loader } from "ui/Loader/Loader";
import { useAppSelector } from "redux/hook";
import { TTodoPayload } from "redux/todos/types";

export default function TodoList({
  todos,
}: {
  todos: TTodoPayload[];
}): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoForUpdateForm, setTodoForUpdateForm] = useState<TTodoPayload>();
  const isLoading = useAppSelector(state => state.todos.isLoading);

  const toggleModal = (e: React.MouseEvent): void => {
    const { dataset, id } = e.target as HTMLDivElement;
    const findTodo = todos.find((it) => it.id === +id);
    if (findTodo) {
      setTodoForUpdateForm((prevState) => ({
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
        {!isLoading && <ul className="todo__list">
          {todos.map((todo) => <Todo todo={todo} toggleFunc={toggleModal} />)}
        </ul>}
        {isModalOpen && (
          <Modal todoForUpdate={todoForUpdateForm} toggleFunc={toggleModal} />
        )}
      </div>
    </>
  );
}
