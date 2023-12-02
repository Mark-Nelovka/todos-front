import React, { useEffect, useState } from 'react'
import { TTodo } from 'redux/todos/todosSlice';
import Button from 'ui/Button/Button'
import { useAppDispatch, useAppSelector } from "redux/hook";
import { TTodoPayload, getAllTodos } from 'redux/todos/todosOperations';
import { Link, NavLink, useNavigate, useNavigation, useLocation } from 'react-router-dom';



// interface IFilterTodoProps {
//     filterFunc: (filtredTodos: TTodoPayload[]) => void
// }

function checkDeadline(deadlineDate: Date): boolean {
    const date = new Date(deadlineDate).getTime();
    const today = new Date().getTime();
    if (date > today) {
      return false;
    } else {
      return true;
    }
  }

export default function Navigation():JSX.Element {
  const todos = useAppSelector((state) => state.todos.data.data.todos);
  const todosCount = useAppSelector((state) => state.todos.data.data.countTodos);

  const navigation = useLocation();
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //   dispatch(getAllTodos({offset: 0, limit: 10, page: 1}))
    // }, [])
    

  return (
    <nav className='nav__container'>
      <ul className='nav__list'>
        <li className='nav__list-item'>
          <NavLink to="/">
            All: {navigation.pathname === "/" && todosCount}
          </NavLink>
        </li>
        <li className='nav__list-item'> 
        <NavLink to="/completed">
        Done: {todos.length > 0 && todos.every((el) => el.completed === true) && todosCount}
          </NavLink></li>
        <li className='nav__list-item'> 
        <NavLink  to="/passed">
          Passed: {todos.length > 0 && checkDeadline(todos[0].deadline) && todosCount}
          </NavLink></li>
      </ul>
    </nav>
  )
}
