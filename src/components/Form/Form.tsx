import Title from "components/Title/Title";
import React, { useState } from "react";
import Button from "ui/Button/Button";
import { Input, TextArea } from "ui/FormFields/Fields";

export default function Form() {
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    date: "",
    isFinished: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChangeInputValue = (event: React.ChangeEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Title style="form__title">Create task</Title>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          value={inputValue.title}
          onChangeFunc={handleChangeInputValue}
          style="form__title-field"
          placeholder="Title"
          id="Title"
          name="title"
          labelTitle="Title"
        />
        <TextArea
          value={inputValue.description}
          onChangeFunc={handleChangeInputValue}
          style="form__description-field "
          placeholder="Write your new task"
          id="Description"
          name="description"
          labelTitle="Description"
        />
      </form>
      <div className="form__button-container">
        <Button styles="" type="submit">
          Create
        </Button>
      </div>
    </>
  );
}
