import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Post from "./Post";
import NavBar from "./NavBar";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/posts" exact>
          <NavBar/>
          <Main />
        </Route>

        <Route path="/posts/:id">
          <NavBar/>
          <Post />
        </Route>

        <Redirect to="/posts" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
