import React, { createContext, useState } from "react";

export const UserContext = createContext();

const [userState, setUserState] = useState({
  userName: "",
  userId: "",
  loggedIn: false,
});

export default (props) => {
  return (
    <UserContext.Provider value={[userState, setUserState]}>
      {props.children}
    </UserContext.Provider>
  );
};
