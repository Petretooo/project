import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import { retrieveStoredToken } from "../actions/controller";
import { setAuthUser } from "../actions/index";

import About from "./pages/About";
import Workout from "./pages/Workout";
import Videos from "./pages/Videos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Layout from "./layout/Layout";

const App = () => {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const { token } = retrieveStoredToken();
    dispatch(setAuthUser(token));
  }, [dispatch]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <About />
        </Route>
        <Route path="/workout">
          {authUser ? <Workout /> : <Redirect to="/login" />}
        </Route>
        <Route path="/videos">
          {authUser ? <Videos /> : <Redirect to="/login" />}
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
