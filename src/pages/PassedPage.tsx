import TodoList from 'components/TodoList/TodoList';
import Pagination from 'components/pagination/Pagination';
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { getAllPassededTodos } from 'redux/todos/todosOperations';

export default function PassedPage() {
  const todos = useAppSelector(state => state.todos.data.data.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPassededTodos({page: 1}))
  }, [])

  const changePage = (page: number) => {
    dispatch(getAllPassededTodos({page: page}))
  }
  
  return (
    <>
    <TodoList todos={todos} />
    <Pagination changePageFunc={changePage}/>
    </>
  )
}
