import React, { useState, createContext } from 'react';

// Contextオブジェクトを作成し、exportする
export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [isLogined, setIsLogined] = useState(false);
  const [openedLogin, setopenedLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = (authEmail, authPassword) => {
    setIsLogined(true);
    setEmail(authEmail);
    setPassword(authPassword);
   
  }
  

  return (
   
    <AuthContext.Provider value={{login, isLogined, email, password}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;