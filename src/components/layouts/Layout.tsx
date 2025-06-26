"use client";

import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";
import { useAuth } from "@/modules/app/AppAuthProvider";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface LayoutPropType {
  children: ReactNode;
}

export default function Layout(props: LayoutPropType) {
  const { children } = props;

  const pathname: string = usePathname();

  const { isAuth } = useAuth();

  return isAuth ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <PublicLayout
      title={pathname === "/" ? "Login" : "Signup"}
      subtitle={
        pathname === "/"
          ? "Please put your credentials"
          : "Please fill up the necessary field to signup!"
      }
    >
      {children}
    </PublicLayout>
  );
}
