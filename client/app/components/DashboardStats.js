'use client'
import { Users, Target, Zap, TrendingUp } from 'lucide-react';

export default function DashboardStats({ stats }) {
  const data = stats || {
    totalLeads: 0,
    conversionRate: 0,
    activeLeads: 0,
    aiMessagesSent: 0
  };
  

  const cards = [
    {
      label: "Total Leads",
      value: data.totalLeads,
      icon: <Users className="text-blue-600" size={24} />,
      bgColor: "bg-blue-50",
      description: "Lifetime leads acquired"
    },
    {
      label: "Conversion Rate",
      value: `${data.conversionRate}%`,
      icon: <Target className="text-emerald-600" size={24} />,
      bgColor: "bg-emerald-50",
      description: "Leads turned to clients"
    },
    {
      label: "Active Focus",
      value: data.activeLeads,
      icon: <TrendingUp className="text-amber-600" size={24} />,
      bgColor: "bg-amber-50",
      description: "Currently in 'Interested' status"
    },
    {
      label: "AI Efficiency",
      value: data.aiMessagesSent,
      icon: <Zap className="text-purple-600" size={24} />,
      bgColor: "bg-purple-50",
      description: "Smart reachouts generated"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl ${card.bgColor} group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
              Live
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 mb-1">{card.value}</h3>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">{card.label}</p>
            <p className="text-[10px] text-slate-400 mt-2 leading-tight">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}