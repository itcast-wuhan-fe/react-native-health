import React, { createContext } from "react";

const auth = {
  token: "",
  setToken: (token: string) => {}
};

const authContext = createContext(auth);

export default authContext;
