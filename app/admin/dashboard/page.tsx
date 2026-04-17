import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MonthlySales = {
  month: string;
  sales: number;
  bookings: number;
};

const monthlySales: MonthlySales[] = [
  { month: "Jan", sales: 18500, bookings: 18 },
  { month: "Feb", sales: 21200, bookings: 22 },
  { month: "Mar", sales: 23800, bookings: 24 },
  { month: "Apr", sales: 26400, bookings: 27 },
  { month: "May", sales: 24750, bookings: 25 },
  { month: "Jun", sales: 29100, bookings: 30 },
  { month: "Jul", sales: 31850, bookings: 32 },
  { month: "Aug", sales: 33700, bookings: 34 },
  { month: "Sep", sales: 30550, bookings: 29 },
  { month: "Oct", sales: 35600, bookings: 37 },
  { month: "Nov", sales: 34150, bookings: 35 },
  { month: "Dec", sales: 38900, bookings: 40 },
];

const packageMix = [
  { name: "Bronze", value: 24, hex: "#f59e0b" },
  { name: "Silver", value: 31, hex: "#94a3b8" },
  { name: "Gold", value: 29, hex: "#0ea5e9" },
  { name: "Gold+++", value: 16, hex: "#22c55e" },
];

const conversionFunnel = [
  { label: "New enquiries", value: 420, color: "bg-slate-900" },
  { label: "Confirmed bookings", value: 318, color: "bg-sky-500" },
  { label: "Completed moves", value: 287, color: "bg-emerald-500" },
];

const totalSales = monthlySales.reduce((sum, item) => sum + item.sales, 0);
const totalBookings = monthlySales.reduce(
  (sum, item) => sum + item.bookings,
  0,
);
const averageMonthlySales = Math.round(totalSales / monthlySales.length);
const averageOrderValue = Math.round(totalSales / totalBookings);
const bestMonth = monthlySales.reduce((best, current) =>
  current.sales > best.sales ? current : best,
);
const yearlyGrowth = Math.round(
  ((monthlySales[monthlySales.length - 1].sales - monthlySales[0].sales) /
    monthlySales[0].sales) *
    100,
);
const maxSales = Math.max(...monthlySales.map((item) => item.sales));
const maxFunnelValue = Math.max(...conversionFunnel.map((item) => item.value));

let currentOffset = 0;
const pieGradient = `conic-gradient(${packageMix
  .map((slice) => {
    const start = currentOffset;
    currentOffset += slice.value;
    return `${slice.hex} ${start}% ${currentOffset}%`;
  })
  .join(", ")})`;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-sky-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          {/* <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-100">
            Dashboard
          </p> */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Monthly Sales Overview
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Monitor monthly revenue, booking performance, and package demand for
            Zazira Movers in one place.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Link href="/admin/sales">
            <SummaryCard
              title="Total annual sales"
              value={formatCurrency(totalSales)}
              note="+12% from last year"
              icon={<BanknotesIcon className="h-5 w-5" />}
              clickable={true}
            />
          </Link>
          <Link href="/admin/sales">
            <SummaryCard
              title="Average monthly sales"
              value={formatCurrency(averageMonthlySales)}
              note="Steady month-on-month growth"
              icon={<CalendarDaysIcon className="h-5 w-5" />}
              clickable={true}
            />
          </Link>
          <SummaryCard
            title="Jobs completed"
            value={totalBookings.toString()}
            note={`${bestMonth.bookings} moves handled in ${bestMonth.month}`}
            icon={<TruckIcon className="h-5 w-5" />}
            clickable={false}
          />
          <Link href="/admin/sales">
            <SummaryCard
              title="Average order value"
              value={formatCurrency(averageOrderValue)}
              note={`${yearlyGrowth}% sales growth from Jan to Dec`}
              icon={<ArrowTrendingUpIcon className="h-5 w-5" />}
              clickable={true}
            />
          </Link>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <Link href="/admin/sales" className="xl:col-span-2">
            <Card className="cursor-pointer transition-all hover:shadow-md hover:border-sky-200">
              <CardHeader>
                <CardTitle>Monthly sales trend</CardTitle>
                <CardDescription>
                  Revenue collected across the last 12 months.
                </CardDescription>
                <p className="text-xs text-sky-600 font-medium mt-2">
                  Click for detailed sales analytics →
                </p>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-72 items-end gap-2 md:gap-3">
                    {monthlySales.map((item) => {
                      const height = Math.max(
                        (item.sales / maxSales) * 100,
                        16,
                      );

                      return (
                        <div
                          key={item.month}
                          className="flex flex-1 flex-col items-center justify-end gap-2"
                        >
                          <span className="text-[10px] font-semibold text-slate-500 md:text-xs">
                            {formatCompactCurrency(item.sales)}
                          </span>
                          <div className="flex h-56 w-full items-end rounded-xl bg-white p-1 shadow-sm">
                            <div
                              className="w-full rounded-lg bg-gradient-to-t from-sky-600 to-cyan-400"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-semibold text-slate-700">
                              {item.month}
                            </p>
                            <p className="text-[10px] text-slate-500 md:text-xs">
                              {item.bookings} jobs
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/packages">
            <Card className="cursor-pointer transition-all hover:shadow-md hover:border-sky-200">
              <CardHeader>
                <CardTitle>Package mix</CardTitle>
                <CardDescription>
                  Share of bookings by service package.
                </CardDescription>
                <p className="text-xs text-sky-600 font-medium mt-2">
                  Click for package details →
                </p>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                <div
                  className="relative flex h-56 w-56 items-center justify-center rounded-full"
                  style={{ backgroundImage: pieGradient }}
                >
                  <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white text-center shadow-inner">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Top package
                    </span>
                    <span className="text-lg font-bold text-slate-900">
                      Silver
                    </span>
                    <span className="text-sm text-slate-600">31%</span>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  {packageMix.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.hex }}
                        />
                        <span className="text-sm font-medium text-slate-700">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Link href="/admin/bookings">
            <Card className="cursor-pointer transition-all hover:shadow-md hover:border-sky-200">
              <CardHeader>
                <CardTitle>Booking conversion funnel</CardTitle>
                <CardDescription>
                  Track enquiries through completed moves.
                </CardDescription>
                <p className="text-xs text-sky-600 font-medium mt-2">
                  Click for booking analytics →
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {conversionFunnel.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {item.label}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div
                        className={`h-3 rounded-full ${item.color}`}
                        style={{
                          width: `${(item.value / maxFunnelValue) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Monthly summary table</CardTitle>
              <CardDescription>
                Quick view of sales and booking counts by month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-slate-500">
                      <th className="pb-3 font-medium">Month</th>
                      <th className="pb-3 font-medium">Sales</th>
                      <th className="pb-3 font-medium">Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlySales.map((item) => (
                      <tr
                        key={item.month}
                        className="border-b last:border-none"
                      >
                        <td className="py-3 font-medium text-slate-700">
                          {item.month}
                        </td>
                        <td className="py-3 text-slate-600">
                          {formatCurrency(item.sales)}
                        </td>
                        <td className="py-3 text-slate-600">{item.bookings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

function SummaryCard({
  title,
  value,
  note,
  icon,
  clickable = false,
}: {
  title: string;
  value: string;
  note: string;
  icon: React.ReactNode;
  clickable?: boolean;
}) {
  return (
    <Card
      className={`border-slate-200 shadow-sm ${clickable ? "cursor-pointer transition-all hover:shadow-md hover:border-sky-200" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
          {icon}
        </div>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-500">{note}</p>
        {clickable && (
          <p className="mt-2 text-xs text-sky-600 font-medium">
            Click for details →
          </p>
        )}
      </CardContent>
    </Card>
  );
}
