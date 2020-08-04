import React from "react";
import "./App.css";
import { Router } from "react-router";
import { Container } from "@material-ui/core";
import history from "./history";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";

function App(props) {
    return (
        <div className="App">
            <Router history={history}>
                <Container>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/register" exact component={Register} />
                    </Switch>
                </Container>
            </Router>
        </div>
    );
}

export default App;
