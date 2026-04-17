import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
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
  averageOrderValue: number;
  growth: number;
};

const detailedMonthlySales: MonthlySales[] = [
  {
    month: "Jan",
    sales: 18500,
    bookings: 18,
    averageOrderValue: 1028,
    growth: 0,
  },
  {
    month: "Feb",
    sales: 21200,
    bookings: 22,
    averageOrderValue: 964,
    growth: 14.6,
  },
  {
    month: "Mar",
    sales: 23800,
    bookings: 24,
    averageOrderValue: 992,
    growth: 12.3,
  },
  {
    month: "Apr",
    sales: 26400,
    bookings: 27,
    averageOrderValue: 978,
    growth: 10.9,
  },
  {
    month: "May",
    sales: 24750,
    bookings: 25,
    averageOrderValue: 990,
    growth: -6.4,
  },
  {
    month: "Jun",
    sales: 29100,
    bookings: 30,
    averageOrderValue: 970,
    growth: 17.6,
  },
  {
    month: "Jul",
    sales: 31850,
    bookings: 32,
    averageOrderValue: 995,
    growth: 9.5,
  },
  {
    month: "Aug",
    sales: 33700,
    bookings: 34,
    averageOrderValue: 991,
    growth: 5.8,
  },
  {
    month: "Sep",
    sales: 30550,
    bookings: 29,
    averageOrderValue: 1053,
    growth: -9.4,
  },
  {
    month: "Oct",
    sales: 35600,
    bookings: 37,
    averageOrderValue: 962,
    growth: 16.5,
  },
  {
    month: "Nov",
    sales: 34150,
    bookings: 35,
    averageOrderValue: 976,
    growth: -4.1,
  },
  {
    month: "Dec",
    sales: 38900,
    bookings: 40,
    averageOrderValue: 973,
    growth: 14.0,
  },
];

const quarterlyData = [
  {
    quarter: "Q1",
    months: ["Jan", "Feb", "Mar"],
    totalSales: 63500,
    totalBookings: 64,
    averageOrderValue: 992,
    growth: 0,
  },
  {
    quarter: "Q2",
    months: ["Apr", "May", "Jun"],
    totalSales: 80250,
    totalBookings: 82,
    averageOrderValue: 979,
    growth: 26.3,
  },
  {
    quarter: "Q3",
    months: ["Jul", "Aug", "Sep"],
    totalSales: 96100,
    totalBookings: 95,
    averageOrderValue: 1012,
    growth: 19.8,
  },
  {
    quarter: "Q4",
    months: ["Oct", "Nov", "Dec"],
    totalSales: 108650,
    totalBookings: 112,
    averageOrderValue: 970,
    growth: 13.0,
  },
];

const topPerformingMonths = detailedMonthlySales
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 3);

const salesByRegion = [
  { region: "Kuala Lumpur", sales: 145200, percentage: 37.3 },
  { region: "Selangor", sales: 112500, percentage: 28.9 },
  { region: "Penang", sales: 67800, percentage: 17.4 },
  { region: "Johor", sales: 45600, percentage: 11.7 },
  { region: "Others", sales: 21900, percentage: 5.6 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercentage(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export default function SalesPage() {
  const totalSales = detailedMonthlySales.reduce(
    (sum, item) => sum + item.sales,
    0,
  );
  const totalBookings = detailedMonthlySales.reduce(
    (sum, item) => sum + item.bookings,
    0,
  );
  const averageOrderValue = Math.round(totalSales / totalBookings);
  const yearlyGrowth = 14.0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-sky-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Sales Analytics
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Detailed breakdown of sales performance, trends, and regional
            distribution for Zazira Movers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">
                {formatCurrency(totalSales)}
              </CardTitle>
              <CardDescription>Total Annual Sales</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
                {formatPercentage(yearlyGrowth)} from last year
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">{totalBookings}</CardTitle>
              <CardDescription>Total Bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Completed moves in 2023</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">
                {formatCurrency(averageOrderValue)}
              </CardTitle>
              <CardDescription>Average Order Value</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Per booking average</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">14.0%</CardTitle>
              <CardDescription>Yearly Growth</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Sales growth rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Details</CardTitle>
              <CardDescription>
                Comprehensive view of sales, bookings, and growth by month.
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
                      <th className="pb-3 font-medium">Avg Order Value</th>
                      <th className="pb-3 font-medium">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedMonthlySales.map((item) => (
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
                        <td className="py-3 text-slate-600">
                          {formatCurrency(item.averageOrderValue)}
                        </td>
                        <td
                          className={`py-3 font-medium ${item.growth >= 0 ? "text-emerald-600" : "text-red-600"}`}
                        >
                          {formatPercentage(item.growth)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quarterly Summary</CardTitle>
              <CardDescription>
                Sales performance aggregated by quarter.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quarterlyData.map((quarter) => (
                  <div
                    key={quarter.quarter}
                    className="rounded-lg border border-slate-100 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {quarter.quarter}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {quarter.months.join(", ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900">
                          {formatCurrency(quarter.totalSales)}
                        </p>
                        <p className="text-sm text-slate-500">
                          {quarter.totalBookings} bookings
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm">
                      <span className="text-slate-600">
                        Avg: {formatCurrency(quarter.averageOrderValue)}
                      </span>
                      <span
                        className={`font-medium ${quarter.growth >= 0 ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {formatPercentage(quarter.growth)} growth
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Months</CardTitle>
              <CardDescription>Best sales months of the year.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingMonths.map((month, index) => (
                  <div
                    key={month.month}
                    className="flex items-center justify-between rounded-lg border border-slate-100 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {month.month}
                        </p>
                        <p className="text-sm text-slate-500">
                          {month.bookings} bookings
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">
                        {formatCurrency(month.sales)}
                      </p>
                      <p className="text-sm text-emerald-600">
                        {formatPercentage(month.growth)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales by Region</CardTitle>
              <CardDescription>
                Geographic distribution of sales revenue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesByRegion.map((region) => (
                  <div key={region.region} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {region.region}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(region.sales)}
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-sky-600 to-cyan-400"
                        style={{ width: `${region.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      {region.percentage}% of total sales
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
