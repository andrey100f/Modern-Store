import { createContext, useContext, useState } from 'react';

interface CrateContextProps {
  activeMenu: boolean;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  screenSize: number;
  setScreenSize: React.Dispatch<React.SetStateAction<number>>;
}

const StateContext = createContext<CrateContextProps | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState<number>(0);

  return (
    <StateContext.Provider value={{ activeMenu, setActiveMenu, screenSize, setScreenSize }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (context === null) {
    throw new Error('useStateContext must be used within a ContextProvider');
  }

  return context;
}