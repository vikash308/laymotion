import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "../lib/auth";

export const metadata = {
  title: "TodoSphere - Streamline Your Day, Effortlessly",
  description: "Organize your tasks, stay productive, and clear your mind with our elegant, modern workspace.",
};

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user = null;

  if (token) {
    user = verifyToken(token);
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-slate-950 px-4 py-20 text-slate-100 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl text-center space-y-8">
        {/* Banner Badges */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/5 px-4 py-1.5 text-sm font-medium text-indigo-300">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          Simplifying Task Management
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-none">
          Streamline Your Day,{" "}
          <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Effortlessly.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-400 font-light leading-relaxed">
          Welcome to <strong className="text-slate-200 font-medium">TodoSphere</strong>. Organize your tasks, track your progress, and stay productive in our highly polished, distraction-free environment.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {user ? (
            <div className="space-y-4 w-full sm:w-auto">
              <p className="text-sm text-slate-400">
                Welcome back, <span className="text-indigo-400 font-semibold">{user.name}</span>! Ready to get things done?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/todo"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-indigo-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                >
                  Go to Todo List
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-indigo-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                Get Started - It's Free
                <span className="ml-2">→</span>
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm px-8 py-4 text-base font-semibold text-slate-200 transition-all hover:bg-slate-850 hover:text-white hover:border-slate-750"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Visual Mock/Features */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-2">
            <h3 className="text-lg font-semibold text-slate-200">User Scoped</h3>
            <p className="text-sm text-slate-400">Your tasks are completely private and tied securely to your personal account.</p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-2">
            <h3 className="text-lg font-semibold text-slate-200">Blazing Fast</h3>
            <p className="text-sm text-slate-400">Instant todo creations, updates, and deletes with high-performance routing.</p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-sm space-y-2">
            <h3 className="text-lg font-semibold text-slate-200">Premium UI</h3>
            <p className="text-sm text-slate-400">Experience a beautifully crafted dark-theme design that is gentle on your eyes.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
