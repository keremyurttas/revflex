"use client";

import LoginModal from "../components/modals/LoginModal";
import SignupModal from "../components/modals/SignupModal";
import SideNavbar from "../components/SideNavbar";
import { useGlobalContext } from "../Context/store";
import { ReactNode } from "react";

type RootContentProps = {
  children: ReactNode;
};

export default function RootContent({ children }: RootContentProps) {
  const { activeModal, setActiveModal } = useGlobalContext();

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
      <SideNavbar />
      <main>{children}</main> {/* Ensure children are rendered */}
    </>
  );
}
