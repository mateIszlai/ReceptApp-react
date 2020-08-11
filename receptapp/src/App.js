import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import UserProvider from "./context/UserContext";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import Header from "./layout/Header";

function App(props) {
  return (
    <UserProvider>
      <div className="App">
        <Content />
      </div>
    </UserProvider>
  );
}

function Content() {
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
