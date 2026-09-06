"use client";

import Loading from "@/components/Loading";
import AuthShell from "@/components/AuthShell";
import { useAppData, user_service } from "@/context/AppContext";
import axios from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const { isAuth, loading: userloading } = useAppData();

  const handleSubmit = async (
    e: React.FormEvent<HTMLElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter your email address to continue.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${user_service}/api/v1/login`, {
        email,
      });
      toast.success(data.message);
      router.push(`/verify?email=${email}`);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        "We could not reach the sign in service. Try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (userloading) return <Loading />;
  if (isAuth) redirect("/chat");

  return (
    <AuthShell
      display={
        <>
          Sign in.
          <br />
          <span className="text-fog-600">No password</span>
          <br />
          <span className="text-fog-600">required.</span>
        </>
      }
      title="Welcome back"
      subtitle="We will email you a six digit code. Nothing to remember, nothing to reset."
      footnote="The code expires five minutes after it is sent."
    >
      <form onSubmit={handleSubmit} noValidate>
        <label
          htmlFor="email"
          className="mb-2 block text-[13px] font-medium text-fog-200"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="you@company.com"
          autoComplete="email"
          autoFocus
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "email-error" : undefined}
          className="ring-focus w-full rounded-control border border-white/12 bg-ink-950/60 px-4 py-3.5 text-[15px] text-fog-50 outline-none transition-colors duration-200 placeholder:text-fog-600 hover:border-white/20"
        />
        {error && (
          <p id="email-error" role="alert" className="mt-2 text-[13px] text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="ring-focus mt-5 flex w-full items-center justify-center gap-2 rounded-control bg-mint-400 px-6 py-3.5 text-[15px] font-semibold text-ink-950 transition-all duration-200 hover:bg-mint-300 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              Sending code
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </>
          )}
        </button>
      </form>
    </AuthShell>
  );
};

export default LoginPage;
