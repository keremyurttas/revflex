"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from "react";

interface ContextProps {
  activeModal: string;
  setActiveModal: Dispatch<SetStateAction<string>>;
}
type RootContentProps = {
  children: ReactNode;
};

const GlobalContext = createContext<ContextProps>({
  activeModal: "",
  setActiveModal: (): string => "",
});
export const GlobalContextProvider = ({ children }: RootContentProps) => {
  const [activeModal, setActiveModal] = useState("");

  return (
    <GlobalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
