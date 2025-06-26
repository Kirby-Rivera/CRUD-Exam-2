import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/modules/app/AppAuthProvider";

interface PropType {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: PropType) {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  return children;
}
