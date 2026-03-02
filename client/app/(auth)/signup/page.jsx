'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', formData);
      router.push('/login'); // Redirect to login
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-10 shadow-2xl shadow-emerald-100/50">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
          <p className="mt-2 text-slate-500">Join the WellnessZ Coach Community</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <input 
              type="text" required placeholder="Full Name"
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" required placeholder="Email Address"
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="password" required placeholder="Password"
              className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:ring-2 focus:ring-emerald-500"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 active:scale-95">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Already a coach? <Link href="/login" className="text-emerald-600 font-bold">Log in</Link>
        </p>
      </div>
    </div>
  );
}