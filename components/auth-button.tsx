"use client";

import { useRouter } from "next/navigation";
import { login } from "@/lib/auth-actions";
import {ReactNode} from "react";

interface AuthButtonProps {
    isLoggedIn: boolean;
    className?: string;
    children?: ReactNode;
}

export default function AuthButton({
    isLoggedIn,
    className,
    children,
}: AuthButtonProps) {
   const router = useRouter();

   const handleClick = async () => {
       if (isLoggedIn) {
           router.push("/trips");
       } else {
           await login();
       }
   };

   return (
       <button onClick={handleClick} className={className}>
           {children}
       </button>
   );
}
