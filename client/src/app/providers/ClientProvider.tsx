"use client";

import { GlobalContextProvider } from "../Context/store";
import { ReactNode } from "react";

type ClientProviderProps = {
  children: ReactNode;
};

export default function ClientProvider({ children }: ClientProviderProps) {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
}