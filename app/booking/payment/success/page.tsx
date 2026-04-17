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
import { CheckCircle2Icon, ArrowRightIcon } from "lucide-react";

interface BookingData {
  pickup?: string;
  drop?: string;
  distance?: string;
  selectedPackage?: string;
  selectedLorry?: string;
  finalPrice?: string;
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData>({});

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

  const handleNewBooking = () => {
    router.push("/booking");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <BackgroundSetter src="/main-background.png" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        <Card className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-black/25">
          <CardHeader className="flex flex-col gap-4 border-b border-slate-800 pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300">
              <CheckCircle2Icon className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              Payment Confirmed
            </CardTitle>
            <CardDescription className="max-w-2xl text-slate-300">
              Your demo transaction is complete. Booking details are preserved
              for review.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  Service
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {bookingData.selectedPackage || "Not available"}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  Vehicle
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {bookingData.selectedLorry || "Not available"}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  Pickup
                </p>
                <p className="mt-3 text-base text-slate-200">
                  {bookingData.pickup || "Not available"}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  Dropoff
                </p>
                <p className="mt-3 text-base text-slate-200">
                  {bookingData.drop || "Not available"}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm uppercase tracking-[0.25em] text-slate-500">
                  Amount
                </span>
                <span className="text-xl font-bold text-white">
                  RM {bookingData.finalPrice || "0.00"}
                </span>
              </div>
              <p className="mt-3 text-slate-400">
                This amount is a demo total for the mock payment flow.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-300">
                Thank you for testing the Chip-in.asia demo gateway. In a
                production integration, this would redirect back after payment
                confirmation.
              </p>
              <Button
                className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                onClick={handleNewBooking}
              >
                Book another move
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
