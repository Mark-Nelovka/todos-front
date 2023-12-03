import { NavLink } from "react-router-dom";

export default function Navigation(): JSX.Element {
  return (
    <nav className="nav__container">
      <ul className="nav__list">
        <li className="nav__list-item">
          <NavLink to="/">All</NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to="/completed">Done</NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink to="/passed">Passed</NavLink>
        </li>
      </ul>
    </nav>
  );
}
