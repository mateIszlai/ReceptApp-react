import React from "react";
import "./App.css";
import { Router } from "react-router";
import { Container } from "@material-ui/core";
import history from "./history";
import Header from "./layout/Header";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";

function App(props) {
    return (
        <div className="App">
            <Router history={history}>
                <Header />
                <Container>
                    <Switch>
                        <Route path="/" exact component={Home} />
                    </Switch>
                </Container>
            </Router>
        </div>
    );
}

export default App;
