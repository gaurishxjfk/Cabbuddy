"use client"
import { appStore } from '@/lib/appStore';
import { useRouter } from 'next/navigation';
import React ,{ ReactNode, useEffect } from 'react';
interface ProtectedRouteProps {
    children: any;
  }
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { userInfo } = appStore((state) => state);
  useEffect(() => {
    if (userInfo.email === "") {
      console.log("hey")
      // router.push('/auth/login');
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
