"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAdmin, setAdminSession, getAdminSession, initializeAdminUser } from "@/lib/data-store";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import config from "@/config";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    initializeAdminUser();

    if (getAdminSession()) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (verifyAdmin(username, password)) {
        setAdminSession(true);
        router.push("/admin/dashboard");
      } else {
        setError("ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়।");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">

          {/* Header */}
          <div className="relative overflow-hidden bg-primary px-6 py-8 text-center sm:px-8">

            <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/5" />

            <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/5" />

            <div className="relative">

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-white shadow-md">
                <Lock size={30} />
              </div>

              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                অ্যাডমিন প্যানেল
              </h1>

              <p className="mt-2 text-sm text-white/70">
                {config.schoolNameBN}
              </p>

            </div>

          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">

            <div className="mb-6">
              <h2 className="text-lg font-bold text-primary">
                লগইন করুন
              </h2>

              <p className="mt-1 text-sm text-muted">
                প্রশাসনিক প্যানেলে প্রবেশ করতে আপনার তথ্য দিন।
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Username */}
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-semibold text-primary">
                  ইউজারনেম
                </label>

                <div className="relative">
                  <User size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ইউজারনেম লিখুন"
                    required
                    disabled={isLoading}
                    className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-primary outline-none transition placeholder:text-muted focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-primary">
                  পাসওয়ার্ড
                </label>

                <div className="relative">
                  <Lock size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="পাসওয়ার্ড লিখুন"
                    required
                    disabled={isLoading}
                    className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-11 text-sm text-primary outline-none transition placeholder:text-muted focus:border-secondary focus:ring-2 focus:ring-secondary/20 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted transition hover:text-secondary"
                    aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Lock size={17} />
                {isLoading ? "লগইন হচ্ছে..." : "লগইন করুন"}
              </button>

            </form>

            {/* Demo Credentials */}
            {/* <div className="mt-6 rounded-lg border border-border bg-background px-4 py-3 text-center">
              <p className="text-xs text-muted">
                Demo Login
              </p>

              <p className="mt-1 text-sm font-semibold text-primary">
                <span className="text-secondary">admin</span>
                <span className="mx-1 text-muted">/</span>
                <span className="text-secondary">admin123</span>
              </p>
            </div> */}

          </div>

        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-muted">
          © {new Date().getFullYear()} {config.schoolNameEN}. All rights reserved.
        </p>

      </div>
    </main>
  );
}