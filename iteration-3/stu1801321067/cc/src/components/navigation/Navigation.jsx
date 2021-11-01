import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="bg-green-500">
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Candice Cock
          </span>
        </div>
        <ul className="flex">
          <li className="mr-6 text-white">
            {/* activeClassName={classes.active} */}
            <NavLink to="/">About</NavLink>
          </li>
          <li className="mr-6 text-white">
            <NavLink to="/workout">Workout</NavLink>
          </li>
          <li className="mr-6 text-white">
            <NavLink to="/videos">Videos</NavLink>
          </li>
          <li className="mr-6 text-white">
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
