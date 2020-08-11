import { useEffect, useContext } from "react";
import axios from "../../axios/axios";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router";

export default function Logout() {
  const setUser = useContext(UserContext)[1];
  const history = useHistory();

  useEffect(() => {
    axios
      .post("/logout")
      .then((response) => {
        if (response.status === 200) {
          setUser({ userName: "", userId: "", loggedIn: false });
          console.log("You logged out!");
          history.push("/");
        }
      })
      .catch((error) => console.log(error));
  }, [history, setUser]);
  return null;
}
