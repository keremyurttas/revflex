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
  setUser: Dispatch<
    SetStateAction<{
      userName: string;
      prefferedName: string;
      genres: string[];
      likes: string[];
      avatar: string;
    }>
  >;
  user: {
    userName: string;
    prefferedName: string;
    genres: string[];
    likes: string[];
    avatar: string;
  };
}
type RootContentProps = {
  children: ReactNode;
};

const GlobalContext = createContext<ContextProps>({
  activeModal: "",
  user: {
    userName: "",
    prefferedName: "",
    genres: [],
    likes: [],
    avatar: "",
  },
  setUser: (): string => "",
  setActiveModal: (): string => "",
});
export const GlobalContextProvider = ({ children }: RootContentProps) => {
  const [activeModal, setActiveModal] = useState("");
  const [user, setUser] = useState<ContextProps["user"]>({
    userName: "",
    prefferedName: "",
    genres: [],
    likes: [],
    avatar: "",
  });

  return (
    <GlobalContext.Provider
      value={{ activeModal, setActiveModal, user, setUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
