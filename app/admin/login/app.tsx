"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Chrome,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ZaziraLogo from "@/app/ui/zazira-logo";

const highlights = [
  {
    title: "Fast booking access",
    description:
      "View customer requests, bookings, and schedules in one place.",
  },
  {
    title: "Secure sign-in",
    description:
      "A clean login flow ready for password and Google auth hookup.",
  },
  {
    title: "Quick recovery",
    description:
      "Reset-password access is already included for future backend setup.",
  },
];

export default function LoginApp() {
  const [forgotMode, setForgotMode] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "username">("email");
  const router = useRouter();

  return (
    <main className="min-h-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]g">
        {/* <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-white shadow-2xl backdrop-blur sm:p-8 lg:p-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="mt-8 space-y-4">
            <span className="inline-flex w-fit items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
              Zazira Movers
            </span>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Login to your moving dashboard
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Sign in with your email or username and password, continue with
              Google, or request a password reset. This page is UI-only and has
              no backend functionality yet.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-5 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              Ready for integration with `next-auth`, Supabase, or your
              preferred auth provider whenever you want to connect the backend.
            </p>
          </div>
        </section> */}

        <section>
          <Card className="border-slate-200 bg-white/95 shadow-2xl backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl text-slate-900">
                {forgotMode ? "Reset your password" : "Welcome back"}
              </CardTitle>
              <CardDescription>
                {forgotMode
                  ? "Enter your account email and we’ll send a reset link once the backend is connected."
                  : "Use your account details below to access the Zazira Movers dashboard."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {forgotMode ? (
                <form
                  className="space-y-4"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="reset-email"
                      className="text-sm font-medium text-slate-700"
                    >
                      Account email
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="name@example.com"
                        className="h-11 pl-10"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="h-11 w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Send reset link
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setForgotMode(false)}
                  >
                    Back to sign in
                  </Button>

                  <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                    Password recovery is visual only for now and does not send
                    an actual email yet.
                  </p>
                </form>
              ) : (
                <>
                  {/* <div className="grid grid-cols-2 rounded-lg bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => setLoginMethod("email")}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition",
                        loginMethod === "email"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-900",
                      )}
                    >
                      Email / Username
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod("username")}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition",
                        loginMethod === "username"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-900",
                      )}
                    >
                      Username
                    </button>
                  </div> */}

                  <form
                    className="space-y-4"
                    onSubmit={(event) => {
                      event.preventDefault();
                      router.push("/admin/dashboard");
                    }}
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="login-identifier"
                        className="text-sm font-medium text-slate-700"
                      >
                        {/* {loginMethod === "email" ? "Email address" : "Username"} */}
                        Email address / Username
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        {/* {loginMethod === "email" ? (
                          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        ) : (
                          <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        )} */}
                        <Input
                          id="login-identifier"
                          type={loginMethod === "email" ? "email" : "text"}
                          placeholder="name@example.com / username"
                          // placeholder={
                          //   loginMethod === "email"
                          //     ? "name@example.com"
                          //     : "Enter your username"
                          // }
                          className="h-11 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-slate-700"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="h-11 pl-10"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm">
                      <label className="flex items-center gap-2 text-slate-600">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                        />
                        Remember me
                      </label>

                      <button
                        type="button"
                        onClick={() => setForgotMode(true)}
                        className="font-medium text-emerald-600 transition hover:text-emerald-700"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="h-11 w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      Login
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-[11px] uppercase tracking-[0.2em]">
                      <span className="bg-white px-2 text-slate-500">
                        or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                  >
                    <Chrome className="h-4 w-4" />
                    Sign in with Google
                  </Button>

                  <p className="text-center text-sm text-slate-600">
                    Need access?{" "}
                    <span className="font-medium text-slate-900">
                      Contact your administrator.
                    </span>
                  </p>
                </>
              )}

              <div className="flex items-center justify-center">
                <Link href="/" className="flex items-center rounded-md p-4">
                  <ZaziraLogo scrolled={true} />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
