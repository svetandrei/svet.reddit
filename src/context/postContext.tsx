import React from "react";
import {usePostReddit} from "../hooks/usePostReddit";

interface IPostContextData {
  cards?: []
}

export const postContext = React.createContext<IPostContextData>({});

export function PostContextProvider ({children}: {children: React.ReactNode}) {
  const {data, loading} = usePostReddit(null, false);
  return (
    <postContext.Provider value={data}>
      {children}
    </postContext.Provider>
  );
}
