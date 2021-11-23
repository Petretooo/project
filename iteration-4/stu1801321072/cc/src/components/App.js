import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import { retrieveStoredToken } from "../actions/controller";
import { setAuthUser, setAuthUserId } from "../actions/index";

import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Layout from "./layout/Layout";
import Board from "./pages/Board";
import Chat from "./pages/Chat";

const App = () => {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const { token, localId } = retrieveStoredToken();

    dispatch(setAuthUser(token));
    dispatch(setAuthUserId(localId));
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <About />
        </Route>
        <Route path="/board">
          {authUser ? <Board /> : <Redirect to="/login" />}
        </Route>
        <Route path="/chat">
          {authUser ? <Chat /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!authUser ? <Login /> : <Redirect to="/workout" />}
        </Route>
        <Route path="/register">
          {!authUser ? <Register /> : <Redirect to="/workout" />}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
