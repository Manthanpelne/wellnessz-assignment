'use client'
import { useState } from 'react';
import api from '@/lib/api';
import { X, User, Phone, Globe, CheckCircle2 } from 'lucide-react';

export default function AddLeadModal({ isOpen, onClose, onRefresh }) {
  const [formData, setFormData] = useState({ name: '', phone: '', source: 'Instagram', status: 'NEW' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/leads', formData);
      onRefresh(); // Refresh the table
      onClose();   // Close modal
    } catch (err) {
      alert("Error adding lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-sm">
      <div className="h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Add New Prospect</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                required placeholder="John Doe" 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">WhatsApp / Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                required placeholder="+91 98765 43210" 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Lead Source</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 text-slate-400" size={18} />
              <select 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500 appearance-none transition-all"
                onChange={(e) => setFormData({...formData, source: e.target.value})}
              >
                <option value="Instagram">Instagram</option>
                <option value="Ads">Facebook Ads</option>
                <option value="Organic">Organic Search</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
          >
            {loading ? "Saving..." : <><CheckCircle2 size={20}/> Save Lead</>}
          </button>
        </form>
      </div>
    </div>
  );
}