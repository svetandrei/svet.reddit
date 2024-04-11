import React from "react";

type commentContextType = {
  value: string;
  onChange: (value: string) => void
}

export const commentFormContext = React.createContext<commentContextType>({
  value: '',
  onChange: (value: string) => {}
});
