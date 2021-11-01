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
          <li className="mr-6 text-white hover:text-gray-200">
            <NavLink exact to="/" activeClassName="underline">
              About
            </NavLink>
          </li>
          <li className="mr-6 text-white hover:text-gray-200">
            <NavLink to="/workout" activeClassName="underline">
              Workout
            </NavLink>
          </li>
          <li className="mr-6 text-white hover:text-gray-200">
            <NavLink to="/videos" activeClassName="underline">
              Videos
            </NavLink>
          </li>
          <li className="mr-6 text-white hover:text-gray-200">
            <NavLink to="/login" activeClassName="underline">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
