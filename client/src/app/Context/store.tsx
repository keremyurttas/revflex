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
  fetchUserDetails: () => void;
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
  fetchUserDetails: () => null,
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

  const fetchUserDetails = async () => {
    const response = await fetch("http://localhost:8000/api/auth/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error("Login failed:", response.statusText);
      // Handle failed login
    }
  };
  return (
    <GlobalContext.Provider
      value={{ activeModal, setActiveModal, user, setUser, fetchUserDetails }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
