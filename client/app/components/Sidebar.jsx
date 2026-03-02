'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, MessageSquare, LogOut, HeartPulse } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Leads', icon: Users, href: '/dashboard/leads' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-3 text-emerald-600">
        <HeartPulse size={32} strokeWidth={2.5} />
        <span className="text-xl font-bold tracking-tight text-slate-800">WellnessZ</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
          className="flex w-full items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}