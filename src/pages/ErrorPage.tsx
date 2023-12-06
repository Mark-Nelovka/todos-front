import ErrorImage from "assets/Error.jpeg";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error__page">
      <p className="error">
        <NavLink to="/">Back to home page</NavLink>
      </p>
      <img src={ErrorImage} alt="error image" />
    </div>
  );
}
