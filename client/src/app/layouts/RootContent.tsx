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
      <div className="lg:flex lg:max-h-screen w-screen">
        <SideNavbar />
        <main className="lg:flex-1 lg:overflow-auto">{children}</main>
      </div>
      {/* Ensure children are rendered */}
    </>
  );
}
