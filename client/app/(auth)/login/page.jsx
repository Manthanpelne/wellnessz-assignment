'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Mail, Lock, ArrowRight, HeartPulse, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('coachName', res.data.name);
      router.push('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white font-sans flex min-h-screen items-center justify-center bg-slate-50 p-4">

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden flex items-center gap-2 text-emerald-600">
             <HeartPulse size={32} />
             <span className="text-xl font-bold">WellnessZ</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-8 font-medium">Please enter your details to access your dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="name@coach.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-900"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-slate-700">Password</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-900"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600 font-medium">
            Don't have an account? <Link href="/signup" className="text-emerald-600 font-bold hover:text-emerald-700 underline decoration-2 underline-offset-4">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}