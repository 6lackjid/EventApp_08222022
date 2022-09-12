import React, { useState, createContext } from 'react';

// Contextオブジェクトを作成し、exportする
export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [isLogined, setIsLogined] = useState(false);
  const [openedLogin, setopenedLogin] = useState(false);
  const login = () => {
    setIsLogined(true);
  }

  return (
   
    <AuthContext.Provider value={{login, isLogined}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;