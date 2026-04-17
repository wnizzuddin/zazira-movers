"use client";

import BackgroundSetter from "@/app/ui/background-setter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon, ArrowRightIcon, CreditCardIcon } from "lucide-react";

interface BookingData {
  pickup?: string;
  drop?: string;
  distance?: string;
  selectedPackage?: string;
  selectedLorry?: string;
  finalPrice?: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("bookingData");
    if (storedData) {
      try {
        setBookingData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing bookingData:", error);
      }
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleDemoPayment = () => {
    setIsLoading(true);
    setStatusMessage("Opening Chip-in.asia demo checkout...");

    setTimeout(() => {
      setIsLoading(false);
      router.push("/booking/payment/success");
    }, 1200);
  };

  return (
    <main className="min-h-screen ">
      <BackgroundSetter src="/main-background.png" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
              Demo Payment Gateway
            </p>
            <h1 className="mt-2 text-4xl font-bold text-white">
              Chip-in.asia Demo Checkout
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-300">
              This is a frontend-only mock payment flow. No real payment is
              processed. You can review your booking details and proceed to a
              demo success screen.
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full max-w-sm "
            onClick={handleBack}
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Edit Booking
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="space-y-6">
            <Card className="border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/20">
              <CardHeader className="border-b border-slate-800 px-6 py-5">
                <CardTitle className="flex items-center gap-3 text-xl text-white">
                  <CreditCardIcon className="h-5 w-5 text-emerald-400" />
                  Payment Details
                </CardTitle>
                <CardDescription className="mt-1 text-slate-400">
                  Review the payment amount and confirm your demo checkout.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 px-6 py-6">
                <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-300">Total Amount</p>
                  <p className="mt-2 text-4xl font-semibold text-white">
                    RM {bookingData.finalPrice || "0.00"}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Final amount based on selected package and distance.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="text-sm text-slate-400">Package</p>
                    <p className="mt-2 font-semibold text-white">
                      {bookingData.selectedPackage || "Unknown"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="text-sm text-slate-400">Vehicle</p>
                    <p className="mt-2 font-semibold text-white">
                      {bookingData.selectedLorry || "Not selected"}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm text-slate-400">Route</p>
                  <p className="mt-2 text-white">
                    {bookingData.pickup || "Pickup not available"}
                  </p>
                  <p className="mt-1 text-white">
                    {bookingData.drop || "Dropoff not available"}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 sm:w-auto"
                    onClick={handleDemoPayment}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing…" : "Pay with Chip-in.asia"}
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                  {statusMessage && (
                    <p className="text-sm text-slate-400">{statusMessage}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/20">
              <CardHeader className="border-b border-slate-800 px-6 py-5">
                <CardTitle className="text-lg text-white">Demo Notes</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-6 text-slate-300">
                <ul className="space-y-3 text-sm">
                  <li>
                    • This is a mock gateway flow only; no real payment is
                    captured.
                  </li>
                  <li>
                    • In production, replace this page with a backend-powered
                    Chip-in.asia checkout.
                  </li>
                  <li>
                    • Session storage preserves booking details between screens.
                  </li>
                  <li>
                    • Use server-side API calls for real payments and secure
                    keys.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/20">
              <CardHeader className="border-b border-slate-800 px-6 py-5">
                <CardTitle className="text-lg text-white">
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 py-6">
                <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Pickup
                  </p>
                  <p className="font-medium text-white">
                    {bookingData.pickup || "—"}
                  </p>
                </div>
                <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Dropoff
                  </p>
                  <p className="font-medium text-white">
                    {bookingData.drop || "—"}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Distance
                    </p>
                    <p className="font-medium text-white">
                      {bookingData.distance || "0 km"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Amount
                    </p>
                    <p className="font-medium text-white">
                      RM {bookingData.finalPrice || "0.00"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/20">
              <CardHeader className="border-b border-slate-800 px-6 py-5">
                <CardTitle className="text-lg text-white">Powered by</CardTitle>
              </CardHeader>
              <CardContent className="px-6 py-6 text-slate-300">
                <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm font-semibold text-white">
                    Chip-in.asia
                  </p>
                  <p className="text-sm text-slate-400">
                    Demo integration only. Replace with the live gateway when
                    ready.
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
