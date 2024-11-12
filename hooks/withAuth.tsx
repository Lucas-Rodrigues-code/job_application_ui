"use client"
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/auth");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Ou um componente de carregamento
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
