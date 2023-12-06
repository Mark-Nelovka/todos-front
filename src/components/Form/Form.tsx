import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hook";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTodo, updateTodo } from "redux/todos/todosOperations";
import Title from "components/Title/Title";
import Button from "ui/Button/Button";
import { Input, TextArea } from "ui/FormFields/Fields";
import CalendarIcon from "assets/calendar-icon.svg";
import { TTodoPayload } from "redux/todos/types";

interface IFormProps {
  todoForUpdate?: IFormStateTodo;
}

interface IFormStateTodo {
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
}

export default function Form({ todoForUpdate }: IFormProps):JSX.Element {
  const [inputValue, setInputValue] = useState<TTodoPayload>({
    title: "",
    description: "",
    deadline: new Date(),
    completed: false,
  });
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.todos.data.data.pagination.page);

  useEffect(() => {
    // Cheack info for autofill form field
    if (todoForUpdate) {
      setInputValue(todoForUpdate);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const limit = page * 10;
    // IF we have do request for update todo in BD and get new layout
    if (todoForUpdate) {
      dispatch(
        updateTodo({
          newTodo: inputValue,
          offset: 0,
          limit,
          page,
        })
      );
      return;
    }
    // If we haven't todo for update we create new todo and push to BD
    dispatch(
      createTodo({
        newTodo: inputValue,
        offset: 0,
        limit,
        page,
      })
    );
  };

  const handleChangeInputValue = (event: React.ChangeEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (deadline: Date) => {
    setInputValue({ ...inputValue, deadline });
  };

  const handleChangeInputValueCompleted = () => {
    setInputValue((prevState) => ({
      ...prevState,
      completed: !prevState.completed,
    }));
  };

  return (
    <>
      <Title style="form__title">
        {todoForUpdate ? "Update todo" : "Create todo"}
      </Title>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          value={inputValue.title!}
          onChangeFunc={handleChangeInputValue}
          style="form__title-field"
          placeholder="Title"
          id="Title"
          name="title"
          labelTitle="Title"
        />
        <TextArea
          value={inputValue.description!}
          onChangeFunc={handleChangeInputValue}
          style="form__description-field "
          placeholder="Write your new task"
          id="Description"
          name="description"
          labelTitle="Description"
        />
        <div className="form__calendar-container">
          <DatePicker
            key="input"
            dateFormat="dd.MM.yyyy"
            selected={inputValue.deadline}
            onChange={handleDateChange}
          />
          <DatePicker
            key="icon"
            dateFormat="dd.MM.yyyy"
            selected={inputValue.deadline}
            onChange={handleDateChange}
            className="form__calendar-icon"
            customInput={<img src={CalendarIcon} alt="Calendar Icon" />}
          />
        </div>
        <Button
          dataValue={"false"}
          id="form-button-complete"
          type="button"
          func={handleChangeInputValueCompleted}
          styles={`form__completed-button ${
            inputValue.completed
              ? "form__completed-button--cancel"
              : "form__complited-button--complete"
          }`}
        >
          {inputValue.completed ? "Cancel completed?" : "Already completed?"}
        </Button>
      </form>
      <div className="form__button-container">
        <Button
          id="form-submit-button"
          styles=""
          func={handleSubmit}
          type="submit"
        >
          {todoForUpdate ? "Update" : "Create"}
        </Button>
      </div>
    </>
  );
}
