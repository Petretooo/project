import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { loginUser } from "../actions/controller";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value.trim());
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value.trim());
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    await loginUser(email, password);
    history.replace("/workout");
  };

  return (
    <div className="mt-32">
      <div className="w-full max-w-xs m-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmitHandler}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={onEmailChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={onPasswordChangeHandler}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log in
            </button>
          </div>
          <div className="text-center mt-5">
            Don't have an account?{" "}
            <Link to="/register" replace>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
