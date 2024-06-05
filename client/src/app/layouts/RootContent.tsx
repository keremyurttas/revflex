"use client";

import CircularProgress from "@mui/material/CircularProgress";
import LoginModal from "../components/modals/LoginModal";
import SignupModal from "../components/modals/SignupModal";
import SideNavbar from "../components/SideNavbar";
import { useGlobalContext } from "../Context/store";
import { ReactNode } from "react";
import Container from "@mui/material/Container";
import LoadingModal from "../components/modals/LoadingModal";

type RootContentProps = {
  children: ReactNode;
};

export default function RootContent({ children }: RootContentProps) {
  const { activeModal, setActiveModal,isLoading } = useGlobalContext();

  return (
    <>
      <LoginModal
        open={activeModal === "login"}
        onClose={() => setActiveModal("")}
      />
      <SignupModal
        open={activeModal === "signup"}
        onClose={() => setActiveModal("")}
      />
      <LoadingModal open={isLoading} />
      <div className="lg:flex lg:max-h-screen w-screen">
        <SideNavbar />
        <main className="lg:flex-1 lg:overflow-auto">{children}</main>
      </div>
    </>
  );
}
