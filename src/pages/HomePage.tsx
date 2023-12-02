import TodoList from 'components/TodoList/TodoList'
import Pagination from 'components/pagination/Pagination';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { TTodoPayload, getAllTodos } from 'redux/todos/todosOperations';

// function checkDeadline(deadlineDate: Date): boolean {
//   const date = new Date(deadlineDate).getTime();
//   const today = new Date().getTime();
//   if (date > today) {
//     return true;
//   } else {
//     return false;
//   }
// }

export default function HomePage() {
  const todos = useAppSelector(state => state.todos.data.data.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTodos({page: 1}))
  }, [])

  const changePage = (page: number) => {
    dispatch(getAllTodos({page: page}))
  }

  return (
    <>
    <TodoList todos={todos} />
    <Pagination changePageFunc={changePage}/>
    </>
  )
}
