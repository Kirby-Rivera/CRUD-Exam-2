"use client";

import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";
import { useAuth } from "@/modules/app/AppAuthProvider";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface LayoutPropType {
  children: ReactNode;
}

export default function Layout(props: LayoutPropType) {
  const { children } = props;
  const { isAuth } = useAuth();
  const pathname: string = usePathname();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

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
