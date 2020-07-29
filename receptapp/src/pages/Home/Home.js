import React, { Fragment, useState } from "react";
import { TextField, Button } from "@material-ui/core";

export default function Home() {
    const [search, setSearch] = useState("");
    const searchClicked = () => {
        console.log(`Search clicked. The searched phrase: ${search}`);
    };
    return (
        <Fragment>
            <h1>Welcome to ReceptApp!</h1>
            <section className="about-us">
                <h4>About the app</h4>
                <p>
                    This is a site where you can search recipes and create a
                    shopping list according to them. After registration you can
                    add recipes to the site and save your favorite recipes.
                </p>
            </section>
            <section>
                <h4>How to use it?</h4>
                <p>You can:</p>
                <ul>
                    <li>Search for recipes</li>
                    <li>Make a shopping list according to them</li>
                    <li>
                        If you have an account then sign in to aditional
                        features
                    </li>
                    <li>If you want a new account then register</li>
                </ul>
            </section>
            <section>
                <form className="search-form" noValidate autoComplete="on">
                    <TextField
                        label="Search"
                        variant="outlined"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </form>
                <Button
                    className="search-btn"
                    variant="contained"
                    color="primary"
                    onClick={searchClicked}
                >
                    Search
                </Button>
            </section>
        </Fragment>
    );
}
