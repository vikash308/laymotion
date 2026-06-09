"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-transform group-hover:scale-105">
                ✓
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                TodoSphere
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Home
            </Link>
            <Link
              href="/todo"
              className={`text-sm font-medium transition-colors ${
                isActive("/todo") ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Todo List
            </Link>
          </div>

          {/* User / Auth Controls */}
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-800" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs text-slate-500 font-medium">Logged in as</span>
                  <span className="text-sm text-slate-200 font-semibold">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className={`text-sm font-medium transition-colors ${
                    isActive("/login") ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
