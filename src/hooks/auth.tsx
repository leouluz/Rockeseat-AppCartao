import React, { createContext, ReactNode, useContext } from 'react'

interface AuthProviderProps{
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthProviderProps{
  user: User;
}


export const AuthContext = createContext({} as IAuthProviderProps);

function AuthProvider({ children }: AuthProviderProps){

  const user = {
    id: '1564',
    name: 'leonardo',
    email: 'leonardo@email.com',
  }

  return(
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth }