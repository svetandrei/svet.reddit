import React from "react";
import {useUserReddit} from "../hooks/useUserReddit";

interface IUserContextData {
  name?: string,
  avatar?: string
}

export const userContext = React.createContext<IUserContextData>({});

export function UserContextProvider ({children}: {children: React.ReactNode}) {
  const {data} = useUserReddit();
  return (
    <userContext.Provider value={data}>
      {children}
    </userContext.Provider>
  )
}
