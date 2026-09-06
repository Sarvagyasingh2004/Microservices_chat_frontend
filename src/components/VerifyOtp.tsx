"use client";

import axios from "axios";
import { ArrowRight, ChevronLeft, Loader2 } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useAppData, user_service } from "@/context/AppContext";
import Loading from "./Loading";
import AuthShell from "./AuthShell";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const {
    isAuth,
    setIsAuth,
    setUser,
    loading: userLoading,
    fetchChats,
    fetchUsers,
  } = useAppData();
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email: string = searchParams.get("email") || "";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (index: number, value: string): void => {
    if (value.length > 1) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.replace(/\D/g, "").slice(0, 6);
    if (digits.length === 6) {
      const newOtp = digits.split("");
      setOtp(newOtp);
      inputRef.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Enter all six digits.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${user_service}/api/v1/verify`, {
        email: email,
        otp: otpString,
      });
      toast.success(data.message);
      Cookies.set("token", data.token, {
        expires: 15,
        secure: false,
        path: "/",
      });
      setOtp(["", "", "", "", "", ""]);
      inputRef.current[0]?.focus();
      setUser(data.user);
      setIsAuth(true);
      fetchChats();
      fetchUsers();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "That code did not work.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`${user_service}/api/v1/login`, {
        email,
      });
      toast.success(data.message);
      setTimer(60);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Could not resend the code.");
    } finally {
      setResendLoading(false);
    }
  };

  if (userLoading) return <Loading />;
  if (isAuth) redirect("/chat");

  return (
    <AuthShell
      display={
        <>
          Check
          <br />
          <span className="text-fog-600">your inbox.</span>
        </>
      }
      title="Enter your code"
      subtitle={
        <>
          We sent six digits to{" "}
          <span className="text-fog-200">{email || "your email"}</span>.
        </>
      }
      headerSlot={
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="ring-focus mb-6 -ml-2 inline-flex items-center gap-1 rounded-control px-2 py-1 text-[13px] text-fog-400 transition-colors hover:text-fog-50"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          Use a different email
        </button>
      }
      footnote={
        timer > 0 ? (
          <>
            You can request a new code in{" "}
            <span className="font-mono text-fog-400">{timer}s</span>.
          </>
        ) : (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendLoading}
            className="ring-focus rounded-control font-medium text-mint-400 transition-colors hover:text-mint-300 disabled:opacity-60"
          >
            {resendLoading ? "Sending a new code" : "Send a new code"}
          </button>
        )
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <label
          htmlFor="otp-0"
          className="mb-3 block text-[13px] font-medium text-fog-200"
        >
          Six digit code
        </label>
        <div className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              ref={(el: HTMLInputElement | null) => {
                inputRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              aria-label={`Digit ${index + 1}`}
              aria-invalid={Boolean(error)}
              className="ring-focus h-14 w-full rounded-control border border-white/12 bg-ink-950/60 text-center font-mono text-[20px] text-fog-50 outline-none transition-colors duration-200 hover:border-white/20"
            />
          ))}
        </div>
        {error && (
          <p role="alert" className="mt-3 text-[13px] text-red-400">
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
              Verifying
            </>
          ) : (
            <>
              Verify
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </>
          )}
        </button>
      </form>
    </AuthShell>
  );
};

export default VerifyOtp;
