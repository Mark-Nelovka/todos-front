import Modal from "components/Modal/Modal";
import Todo from "components/Todo/Todo";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/hook";
import { TTodoPayload } from "redux/todos/todosOperations";
import { TTodo } from "redux/todos/todosSlice";



export default function TodoList({todos}: {todos: TTodoPayload[]}): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoForUpdateForm, setTodoForUpdateForm] = useState<TTodoPayload>();

  const toggleModal = (e: React.MouseEvent): void => {
    const { dataset, id } = e.target as HTMLDivElement;
    const findTodo = todos.find((it) => it.id === +id);
    if (findTodo) {
      setTodoForUpdateForm((prevState) => ({...findTodo, date: new Date(findTodo.deadline)}))
    }
    if (dataset.backdrop) {
      setIsModalOpen(!isModalOpen);
    }
  };

  return (
    <>
      <ul className="todo__list">
        {todos.length > 0 &&
          todos.map((todo) => <Todo todo={todo} toggleFunc={toggleModal} />)}
      </ul>
      {isModalOpen && (
        <Modal todoForUpdate={todoForUpdateForm} toggleFunc={toggleModal} />
      )}
    </>
  );
}
