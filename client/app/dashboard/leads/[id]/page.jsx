'use client'
import { useEffect, useState, use } from 'react';
import api from '@/lib/api';
import { Zap, MessageCircle, Copy, Loader2, History, ChevronDown } from 'lucide-react';
import Timeline from '@/app/components/Timeline';

export default function LeadDetailsPage({ params }) {
  const { id } = use(params);
  const [lead, setLead] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [aiResponse, setAiResponse] = useState(null); 

  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const leadRes = await api.get(`/leads/${id}`);
        setLead(leadRes.data);
        
        try {
          const activityRes = await api.get(`/leads/${id}/timeline`); 
          setActivities(activityRes.data.activities || activityRes.data); 
        } catch (actErr) {
          setActivities([]);
        }
      } catch (err) {
        console.error("Fatal error fetching lead", err);
      }
    };
    fetchLeadData();
  }, [id]);

  const generateAI = async () => {
    setAiLoading(true);
    try {
      const res = await api.post(`/leads/${id}/generate-message`);
      if (res.data) {
        setAiResponse(res.data); 
      }
    } catch (err) {
      console.error("AI Error:", err);
      alert(err.response?.status === 429 ? "Rate limit reached (5/hr)" : "AI Failed");
    } finally {
      setAiLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await api.patch(`/leads/${id}`, { status: newStatus });
      setLead(prev => ({ ...prev, status: newStatus }));
      const activityRes = await api.get(`/leads/${id}/timeline`);
      setActivities(activityRes.data.activities || activityRes.data);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!lead) return <div className="p-10 animate-pulse text-slate-400">Loading Lead Intelligence...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-2">
      {/* LEFT COLUMN: Profile & History */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-4 border-white shadow-md">
            {lead.name[0]}
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{lead.name}</h2>
          <p className="text-slate-500 mb-6">{lead.phone}</p>
          
          <div className="relative group">
            <select 
              value={lead.status}
              onChange={(e) => updateStatus(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-100 py-3 px-4 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
            >
              <option value="NEW">New Lead</option>
              <option value="INTERESTED">Interested</option>
              <option value="CONVERTED">Converted</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm max-h-[500px] overflow-y-auto">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <History size={20} className="text-slate-400" /> History
          </h3>
          <Timeline activities={activities} />
        </div>
      </div>

      {/* RIGHT COLUMN: AI Reachout */}
      <div className="lg:col-span-2 space-y-6">
        {/* Removed h-screen for better responsiveness */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col min-h-[600px]">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Zap className="text-emerald-500" fill="currentColor" size={24} /> AI Message Studio
              </h3>
              <p className="text-slate-400 text-sm">Gemini AI will draft a follow-up based on {lead.name}'s history.</p>
            </div>
            <button 
              onClick={generateAI} 
              disabled={aiLoading}
              className="bg-slate-900 cursor-pointer text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
            >
              {aiLoading ? <Loader2 className="animate-spin" size={20}/> : <><Zap size={18}/> Generate</>}
            </button>
          </div>

          {/* AI Result Area */}
          <div className={`flex-1 rounded-[2rem] p-8 transition-all duration-500 border-2 ${
            aiResponse?.whatsapp ? "bg-emerald-50/40 border-emerald-100" : "bg-slate-50 border-dashed border-slate-200"
          }`}>
            <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
              {aiResponse?.whatsapp || "Your AI-generated message will appear here..."}
            </p>
          </div>

          {/* Coach Toolkit */}
          {aiResponse && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-2">Coach Toolkit</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-3xl">
                  <p className="text-[10px] font-bold text-amber-600 uppercase mb-2 tracking-widest">Handling Objections</p>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{aiResponse.objectionHandler || "No objections predicted for this lead."}"
                  </p>
                </div>
                
                <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-3xl">
                  <p className="text-[10px] font-bold text-blue-600 uppercase mb-2 tracking-widest">Conversation Flow</p>
                  <div className="space-y-3">
                    {aiResponse.callScript?.map((step, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-[10px] flex items-center justify-center font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          {aiResponse?.whatsapp && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(aiResponse.whatsapp);
                  // Optional: use a toast library here for a better UI
                }}
                className="bg-white border-2 border-slate-100 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Copy size={20}/> Copy Message
              </button>
              <a 
                href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(aiResponse.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 active:scale-95"
              >
                <MessageCircle size={20}/> Open WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}