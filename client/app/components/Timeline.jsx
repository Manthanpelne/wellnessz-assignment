import { Clock, CheckCircle2, Zap, UserPlus } from 'lucide-react';

export default function Timeline({ activities }) {
  if (!activities || activities.length === 0) {
    return <div className="text-slate-400 text-sm p-4">No activity recorded yet.</div>;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'STATUS_CHANGE': return <CheckCircle2 size={16} className="text-blue-500" />;
      case 'NOTE': return <Zap size={16} className="text-amber-500" />;
      default: return <UserPlus size={16} className="text-emerald-500" />;
    }
  };

  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-200 before:via-slate-200 before:to-transparent">
      {activities.map((activity, index) => (
        <div key={activity._id} className="relative flex items-start gap-6 group">
          {/* Timeline Dot/Icon */}
          <div className="absolute left-0 w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10 shadow-sm group-hover:border-emerald-500 transition-colors">
            {getIcon(activity.type)}
          </div>

          {/* Content */}
          <div className="pl-12 pt-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-slate-800">{activity.content}</span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full">
                <Clock size={10} /> {new Date(activity.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Logged by WellnessZ System
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}