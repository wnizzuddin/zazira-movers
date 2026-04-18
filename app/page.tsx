import BackgroundSetter from "@/app/ui/background-setter";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zazira Movers - Need a Moving Truck Today?",
};

export default function Page() {
  return (
    <main className="flex min-h-[90vh] flex-col">
      <BackgroundSetter src="/main-background.png" />
      <div className="relative min-h-[90vh] flex items-center justify-start py-16 px-6 sm:px-10 md:px-16 lg:pl-[300px]">
        <div className="relative z-10 w-full max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Need a Moving Truck Today? We're Ready 24/7
          </h1>

          <div className="mb-5">
            <span className="inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded text-sm md:text-base">
              MALAYSIA'S #1 MOVING EXPERT
            </span>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 leading-relaxed">
            Expert movers in Malaysia for home, office, and industrial moves
            with a variety of truck sizes and same-day service options. Our team
            is on standby 24 hours a day and ready to come directly to your
            location.
          </p>

          <div className="mb-6">
            <p className="text-yellow-400 font-semibold text-sm md:text-base">
              Fast Response • 24/7
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto text-sm md:text-base"
            >
              BOOK NOW
              <span>⟶</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-yellow-400 hover:bg-yellow-400/10 active:bg-yellow-400/20 text-yellow-400 font-bold px-6 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto text-sm md:text-base"
            >
              Our Services
              <span>⟶</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-1">
                35,000+
              </p>
              <p className="text-white font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wide">
                Successful Moves
              </p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-1">
                99%
              </p>
              <p className="text-white font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wide">
                Customer Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
