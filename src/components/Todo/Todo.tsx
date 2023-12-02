import Modal from "components/Modal/Modal";
import React, { useState } from "react";
import { useAppDispatch } from "redux/hook";
import { TTodoPayload, removeTodo, updateTodo } from "redux/todos/todosOperations";
import { TTodo } from "redux/todos/todosSlice";
import Button from "ui/Button/Button";
import removeIcon from "assets/remove-icon.svg";

function checkDeadline(deadlineDate: string): string {
  const date = new Date(deadlineDate).getTime();
  const today = new Date().getTime();
  if (date > today) {
    return "todo__list-item--accept";
  } else {
    return "todo__list-item--pass";
  }
}

interface ITodo {
  toggleFunc: (e: React.MouseEvent) => void;
  todo: TTodoPayload;
}

export default function Todo({ todo, toggleFunc }: ITodo) {
  const dispatch = useAppDispatch();

  const handleremoveTodo = (id?: number) => {
    dispatch(removeTodo(id!));
  };

  const handleUpdateTodo = () => {
    dispatch(updateTodo({...todo, completed: true}))
  };

  return (
    <>
    {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut illum consequuntur adipisci voluptatem dolor dignissimos aliquam optio, dolore hic? Nobis autem recusandae nihil doloremque at voluptatem tempora sint accusamus animi..</p> */}
      {
        <li
          className={`todo__list-item ${checkDeadline(String(todo.deadline))}`}
          key={todo.id}
        >
          <p className="todo__list-item_title todo__list-item_decoration">
            {todo.title}
          </p>
          <p className="todo__list-item_decoration todo__list-item_description">
            {todo.description}
          </p>
          <p className={`todo__list-item_decoration todo__list-item_deadline`}>
            <span>Deadline:</span> {String(todo.deadline)}
          </p>
          <div className="todo__list-item_button-container">
            <Button
              styles="todo__list-item_button_update"
              id={String(todo.id)}
              func={toggleFunc}
              type="button"
            >
              Update
            </Button>
            <Button
              styles="todo__list-item_button_done"
              id="done"
              func={handleUpdateTodo}
              type="button"
            >
              Done
            </Button>
            <Button
              styles="todo__list-item_button_delete"
              id="delete"
              func={() => handleremoveTodo(todo.id)}
              type="button"
            >
              <img src={removeIcon} alt="remove todo item icon" />
            </Button>
          </div>
        </li>
      }
    </>
  );
}
