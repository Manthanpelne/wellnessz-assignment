'use client'
import { useState, useEffect } from 'react';
import api from '@/lib/api';

import { MessageSquare, MoreVertical, Plus, Search } from 'lucide-react';
import AddLeadModal from '@/app/components/AddLeadModal';
import Link from 'next/link';
import DashboardStats from '@/app/components/DashboardStats';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal
  const [search, setSearch] = useState('');

  const [stats, setStats] = useState(null);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const [statsRes, leadsRes] = await Promise.all([
        api.get('/leads/dashboard/stats'),
        api.get('/leads')
      ]);
      const data = statsRes.data;
      setStats(data);
      console.log("Stat1", data);
      setLeads(leadsRes.data);
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };
  fetchDashboardData();
}, []);


  const fetchLeads = async () => {
    try {
      const res = await api.get(`/leads?search=${search}`);
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchLeads(); }, [search]);

return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Lead Center</h1>
          <p className="text-slate-500 font-medium">Overview of your coaching pipeline</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 active:scale-95"
        >
          <Plus size={20} /> Add New Lead
        </button>
      </div>

      {/* 2. The Stats Grid (Pass the stats state here) */}
      <DashboardStats stats={stats} />

      {/* 3. Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm font-medium"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="bg-slate-50 border-none rounded-xl px-6 py-3 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
          <option value="">All Statuses</option>
          <option value="NEW">New</option>
          <option value="INTERESTED">Interested</option>
          <option value="CONVERTED">Converted</option>
        </select>
      </div>

      {/* 4. Leads Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Client</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Source</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-8 py-5">
                  <Link href={`/dashboard/leads/${lead._id}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                      {lead.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{lead.name}</p>
                      <p className="text-xs font-medium text-slate-400">{lead.phone}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-8 py-5">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm text-slate-600 font-semibold bg-slate-50 px-3 py-1 rounded-lg">{lead.source}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition">
                      <MessageSquare size={20} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {leads.length === 0 && (
          <div className="py-24 text-center">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-medium italic">No leads found in your pipeline.</p>
          </div>
        )}
      </div>

      {/* 5. Modal */}
      <AddLeadModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchLeads} 
      />
    </div>
  );
}

// Sub-component for Status Badges
function StatusBadge({ status }) {
  const styles = {
    NEW: "bg-blue-50 text-blue-600 border-blue-100",
    INTERESTED: "bg-amber-50 text-amber-600 border-amber-100",
    CONVERTED: "bg-emerald-50 text-emerald-600 border-emerald-100",
    REJECTED: "bg-rose-50 text-rose-600 border-rose-100",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}