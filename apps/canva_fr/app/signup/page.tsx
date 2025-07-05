"use client"

import { useRouter } from "next/navigation";
import AuthPage from "../Componenets/AuthPage"
import ProtectedRoute from "../Componenets/protectedRoutes"
import { useEffect } from "react";


const SignUp = () => {

   const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Redirect to dashboard or home if already logged in
      router.replace('/dashboard');
    }
  }, []);

  return <AuthPage isSignin={false} />

 
}

export default SignUp
