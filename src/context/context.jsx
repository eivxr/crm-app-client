import React, { useState } from "react";

const context = React.createContext([{}, () => {}]);

const contextProvider = (props) => {
  const [auth, setAuth] = useState({
    token: "",
    auth: "false",
  });

  return (
    <context.Provider value={[auth, setAuth]}>
      {props.children}
    </context.Provider>
  );
};
export { context, contextProvider };
