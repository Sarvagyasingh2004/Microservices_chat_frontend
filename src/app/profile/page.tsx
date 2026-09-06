"use client";
import { useAppData, user_service } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import Avatar from "@/components/Avatar";
import { ArrowLeft, Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { user, isAuth, loading, setUser } = useAppData();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState<string | undefined>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const editHandler = () => {
    setIsEdit(!isEdit);
    setError("");
    setName(user?.name);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (!name?.trim()) {
      setError("Your display name cannot be empty.");
      return;
    }
    setError("");
    setSaving(true);
    const token = Cookies.get("token");
    try {
      const { data } = await axios.post(
        `${user_service}/api/v1/user/update`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      Cookies.set("token", data.token, {
        expires: 15,
        secure: false,
        path: "/",
      });

      toast.success(data.message);
      setUser(data.user);
      setIsEdit(false);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ?? "Could not save your changes.";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!isAuth && !loading) {
      router.push("/login");
    }
  }, [isAuth, router, loading]);

  if (loading) return <Loading />;

  return (
    <main className="min-h-dvh bg-ink-950 px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-[620px]">
        <button
          onClick={() => router.push("/chat")}
          className="ring-focus -ml-2 mb-10 inline-flex items-center gap-1.5 rounded-control px-2 py-1 text-[13.5px] text-fog-400 transition-colors hover:text-fog-50"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Back to conversations
        </button>

        <h1 className="text-[30px] font-medium leading-tight tracking-[-0.02em] text-fog-50">
          Profile
        </h1>
        <p className="mt-2 text-[14.5px] text-fog-400">
          This is the name other people see on your messages.
        </p>

        <div className="mt-9 flex items-center gap-4 rounded-panel border border-ink-800 bg-ink-900 p-5">
          <Avatar name={user?.name} size="lg" />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-medium text-fog-50">
              {user?.name || "Not set"}
            </p>
            <p className="truncate text-[13px] text-fog-500">{user?.email}</p>
          </div>
        </div>

        <div className="mt-4 rounded-panel border border-ink-800 bg-ink-900 p-5">
          {isEdit ? (
            <form onSubmit={submitHandler} noValidate>
              <label
                htmlFor="display-name"
                className="mb-2 block text-[13px] font-medium text-fog-200"
              >
                Display name
              </label>
              <input
                id="display-name"
                type="text"
                value={name}
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "name-error" : undefined}
                className="ring-focus w-full rounded-control border border-ink-700 bg-ink-850 px-4 py-3 text-[15px] text-fog-50 outline-none transition-colors placeholder:text-fog-600 hover:border-ink-600"
              />
              {error && (
                <p id="name-error" role="alert" className="mt-2 text-[13px] text-red-400">
                  {error}
                </p>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="ring-focus flex items-center justify-center gap-2 rounded-control bg-mint-400 px-5 py-2.5 text-[14px] font-semibold text-ink-950 transition-all hover:bg-mint-300 active:scale-[0.985] disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                      Saving
                    </>
                  ) : (
                    "Save changes"
                  )}
                </button>
                <button
                  type="button"
                  onClick={editHandler}
                  className="ring-focus rounded-control border border-ink-700 px-5 py-2.5 text-[14px] font-medium text-fog-200 transition-colors hover:bg-ink-850"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-fog-200">
                  Display name
                </p>
                <p className="mt-1 truncate text-[15px] text-fog-50">
                  {user?.name || "Not set"}
                </p>
              </div>
              <button
                onClick={editHandler}
                className="ring-focus shrink-0 rounded-control border border-ink-700 px-4 py-2 text-[13.5px] font-medium text-fog-200 transition-colors hover:bg-ink-850"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
