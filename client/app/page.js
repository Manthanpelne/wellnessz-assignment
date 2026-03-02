import Link from 'next/link';
import { HeartPulse, Zap, ShieldCheck, BarChart3 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-emerald-600">
          <HeartPulse size={32} />
          <span className="text-xl font-bold text-slate-800">WellnessZ</span>
        </div>
        <Link href="/login" className="font-semibold text-slate-600 hover:text-emerald-600 transition">
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          Scale your Coaching with <span className="text-emerald-600">AI Intelligence.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          The all-in-one CRM for wellness professionals. Track leads, automate follow-ups with Gemini AI, and watch your conversion rates soar.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 w-full sm:w-auto">
            Get Started for Free
          </Link>
          <Link href="/login" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold text-lg hover:bg-slate-50 transition w-full sm:w-auto">
            Coach Login
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 text-left">
          <Feature icon={Zap} title="AI Follow-ups" desc="Generate personalized WhatsApp messages using Gemini AI in seconds." />
          <Feature icon={BarChart3} title="Sleek Analytics" desc="Visualise your lead sources and conversion funnels with Redis-backed speed." />
          <Feature icon={ShieldCheck} title="Lead Protection" desc="Never lose a client again with our automated timeline and activity tracking." />
        </div>
      </main>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="space-y-4">
      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-2xl">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}