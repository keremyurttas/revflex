"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface ContextProps {
  activeModal: string | null;
  setActiveModal: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<
    SetStateAction<{
      username: string;
      prefferedName: string;
      genres: string[];
      likes: string[];
      avatar: string;
    }>
  >;
  user: {
    username: string;
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
  activeModal: null,
  user: {
    username: "",
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
    username: "",
    prefferedName: "",
    genres: [],
    likes: [],
    avatar: "",
  });

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/user/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Update the user state
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching user details:", error);
    }
  }, [setUser]);
  return (
    <GlobalContext.Provider
      value={{ activeModal, setActiveModal, user, setUser, fetchUserDetails }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
