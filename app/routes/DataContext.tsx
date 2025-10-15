import React, { createContext, useState, ReactNode } from "react";

// Define the shape of your context data
interface DataContextType {
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with an initial undefined value
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Define the props for the provider
interface DataProviderProps {
  children: ReactNode;
}

// DataProvider component
export function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<string>("Initial content");

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
