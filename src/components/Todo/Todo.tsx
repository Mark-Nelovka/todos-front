import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hook";
import { removeTodo, updateTodo } from "redux/todos/todosOperations";
import Button from "ui/Button/Button";
import removeIcon from "assets/remove-icon.svg";
import { TTodoPayload } from "redux/todos/types";

interface ITodo {
  toggleFunc: (e: React.MouseEvent) => void;
  todo: TTodoPayload;
}

export default function Todo({ todo, toggleFunc }: ITodo): JSX.Element {
  const page = useAppSelector((state) => state.todos.data.data.pagination.page);
  const dispatch = useAppDispatch();

  const handleremoveTodo = () => {
    const limit = page * 10;
    dispatch(
      removeTodo({
        id: todo.id!,
        offset: 0,
        limit,
        page,
      })
    );
  };

  const handleUpdateCompleteTodo = () => {
    const limit = page * 10;
    dispatch(
      updateTodo({
        newTodo: { ...todo, completed: true },
        offset: 0,
        limit,
        page,
      })
    );
  };

  return (
    <>
      {
        <li className={`todo__list-item`} key={todo.id}>
          <p className="todo__list-item_title todo__list-item_decoration">
            {todo.title ? todo.title : "Title"}
          </p>
          <p className="todo__list-item_decoration todo__list-item_description">
            {todo.description ? todo.description : "Description"}
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
              func={handleUpdateCompleteTodo}
              type="button"
              disabled={todo.completed}
            >
              Done
            </Button>
            <Button
              styles="todo__list-item_button_delete"
              id="delete"
              func={handleremoveTodo}
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
