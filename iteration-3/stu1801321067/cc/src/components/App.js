import { Switch, Route } from "react-router-dom";

import About from "./pages/About";
import Workout from "./pages/Workout";
import Videos from "./pages/Videos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Layout from "./layout/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <About />
        </Route>
        <Route path="/workout">
          <Workout />
        </Route>
        <Route path="/videos">
          <Videos />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
