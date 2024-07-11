/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

function reducer(state, { type, payload }) {
  switch (type) {
    case "login":
      return { ...state, user: payload, isauthenticated: true };

    case "logout":
      return { ...state, user: {}, isauthenticated: false };

    default:
      throw new Error("Unknown Action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@gmail.com",
  password: "hi",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialstate = { user: {}, isauthenticated: false };

function AuthProvider({ children }) {
  const [{ user, isauthenticated }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isauthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth context used outside its provider");
  return context;
}

export { AuthProvider, useAuth };
