'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


export default function DashboardLayout({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return null; // Or a sleek loading spinner

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* 1. Fixed Sidebar */}
      <Sidebar />

      {/* 2. Main Work Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Navbar for Profile & Search */}
        <Navbar />

        {/* Scrollable Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}