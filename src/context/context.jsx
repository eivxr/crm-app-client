import React, { useState , useEffect} from "react";

const AuthContext = React.createContext([{}, () => {}]);

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || '',
    auth: !!localStorage.getItem('token')
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ token, auth: true });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };
