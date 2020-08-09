import React from "react";
import "./App.css";
import { Router } from "react-router";
import { Container } from "@material-ui/core";
import history from "./history";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import UserProvider from "./context/UserContext";
import Login from "./pages/Login/Login";

function App(props) {
  return (
    <div className="App">
      <Router history={history}>
        <Container>
          <Switch>
            <UserProvider>
              <Route path="/" exact component={Home} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
            </UserProvider>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
