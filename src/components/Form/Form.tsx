import Title from "components/Title/Title";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "redux/hook";
import {
  TTodoPayload,
  createTodo,
  updateTodo,
} from "redux/todos/todosOperations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "ui/Button/Button";
import { Input, TextArea } from "ui/FormFields/Fields";
import CalendarIcon from "assets/calendar-icon.svg";

interface IFormProps {
  todoForUpdate?: TTodoPayload;
}

export default function Form({ todoForUpdate }: IFormProps) {
  const [inputValue, setInputValue] = useState<TTodoPayload>({
    title: "",
    description: "",
    deadline: new Date(),
    completed: false,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (todoForUpdate) {
      setInputValue(todoForUpdate);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(todoForUpdate) {
      dispatch(updateTodo(inputValue))
      return;
    }
    dispatch(createTodo(inputValue))
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
            // minDate={new Date()}
            className="qwe"
            onChange={handleDateChange}
          />
          <DatePicker
            key="icon"
            dateFormat="dd.MM.yyyy"
            selected={inputValue.deadline}
            // minDate={new Date()}
            onChange={handleDateChange}
            className="form__calendar-icon"
            customInput={<img src={CalendarIcon} alt="Calendar Icon" />}
          />
        </div>
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
