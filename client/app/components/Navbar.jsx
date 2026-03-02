'use client'
import { Bell, Search, UserCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
     <div></div>
      <div className="flex items-center gap-4">
       <div></div>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">Coach Manthan</span>
          <UserCircle size={32} className="text-slate-300" />
        </div>
      </div>
    </header>
  );
}