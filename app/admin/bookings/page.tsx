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

type FunnelStage = {
  stage: string;
  count: number;
  percentage: number;
  color: string;
  description: string;
  monthlyTrend: number[];
};

const conversionFunnel: FunnelStage[] = [
  {
    stage: "Website Visits",
    count: 12500,
    percentage: 100,
    color: "bg-slate-400",
    description: "Total visitors to the website",
    monthlyTrend: [
      950, 1100, 1200, 1050, 980, 1150, 1250, 1180, 1050, 1300, 1200, 1100,
    ],
  },
  {
    stage: "Quote Requests",
    count: 2100,
    percentage: 16.8,
    color: "bg-blue-500",
    description: "Visitors who requested a quote",
    monthlyTrend: [160, 185, 200, 175, 165, 195, 210, 200, 180, 220, 205, 190],
  },
  {
    stage: "Confirmed Enquiries",
    count: 420,
    percentage: 3.4,
    color: "bg-sky-500",
    description: "Quotes that became confirmed enquiries",
    monthlyTrend: [32, 37, 40, 35, 33, 39, 42, 40, 36, 44, 41, 38],
  },
  {
    stage: "Booked Moves",
    count: 318,
    percentage: 2.5,
    color: "bg-emerald-500",
    description: "Enquiries that resulted in bookings",
    monthlyTrend: [24, 28, 30, 26, 25, 29, 32, 30, 27, 33, 31, 29],
  },
  {
    stage: "Completed Moves",
    count: 287,
    percentage: 2.3,
    color: "bg-green-600",
    description: "Successfully completed moving jobs",
    monthlyTrend: [22, 25, 27, 24, 23, 26, 29, 27, 24, 30, 28, 26],
  },
];

const monthlyConversionRates = [
  {
    month: "Jan",
    visits: 950,
    quotes: 160,
    enquiries: 32,
    bookings: 24,
    completed: 22,
  },
  {
    month: "Feb",
    visits: 1100,
    quotes: 185,
    enquiries: 37,
    bookings: 28,
    completed: 25,
  },
  {
    month: "Mar",
    visits: 1200,
    quotes: 200,
    enquiries: 40,
    bookings: 30,
    completed: 27,
  },
  {
    month: "Apr",
    visits: 1050,
    quotes: 175,
    enquiries: 35,
    bookings: 26,
    completed: 24,
  },
  {
    month: "May",
    visits: 980,
    quotes: 165,
    enquiries: 33,
    bookings: 25,
    completed: 23,
  },
  {
    month: "Jun",
    visits: 1150,
    quotes: 195,
    enquiries: 39,
    bookings: 29,
    completed: 26,
  },
  {
    month: "Jul",
    visits: 1250,
    quotes: 210,
    enquiries: 42,
    bookings: 32,
    completed: 29,
  },
  {
    month: "Aug",
    visits: 1180,
    quotes: 200,
    enquiries: 40,
    bookings: 30,
    completed: 27,
  },
  {
    month: "Sep",
    visits: 1050,
    quotes: 180,
    enquiries: 36,
    bookings: 27,
    completed: 24,
  },
  {
    month: "Oct",
    visits: 1300,
    quotes: 220,
    enquiries: 44,
    bookings: 33,
    completed: 30,
  },
  {
    month: "Nov",
    visits: 1200,
    quotes: 205,
    enquiries: 41,
    bookings: 31,
    completed: 28,
  },
  {
    month: "Dec",
    visits: 1100,
    quotes: 190,
    enquiries: 38,
    bookings: 29,
    completed: 26,
  },
];

const conversionMetrics = [
  {
    metric: "Quote Request Rate",
    value: "16.8%",
    description: "Percentage of visitors who request quotes",
    trend: "+2.1%",
    status: "good",
  },
  {
    metric: "Enquiry Conversion",
    value: "20.0%",
    description: "Percentage of quotes that become enquiries",
    trend: "+1.5%",
    status: "good",
  },
  {
    metric: "Booking Rate",
    value: "75.7%",
    description: "Percentage of enquiries that get booked",
    trend: "-0.8%",
    status: "neutral",
  },
  {
    metric: "Completion Rate",
    value: "90.3%",
    description: "Percentage of bookings completed successfully",
    trend: "+1.2%",
    status: "good",
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-MY").format(value);
}

function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}

export default function BookingsPage() {
  const overallConversionRate =
    (conversionFunnel[4].count / conversionFunnel[0].count) * 100;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-sky-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Booking Analytics
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Detailed analysis of the booking conversion funnel and customer
            journey for Zazira Movers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">
                {formatNumber(conversionFunnel[0].count)}
              </CardTitle>
              <CardDescription>Total Website Visits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Monthly average visitors</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">
                {formatNumber(conversionFunnel[3].count)}
              </CardTitle>
              <CardDescription>Total Bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Confirmed moving jobs</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">
                {formatPercentage(overallConversionRate)}
              </CardTitle>
              <CardDescription>Overall Conversion Rate</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
                From visits to completed moves
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">90.3%</CardTitle>
              <CardDescription>Completion Rate</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
                Successful job completion
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>
                Customer journey from website visit to completed move.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {stage.stage}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {stage.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">
                        {formatNumber(stage.count)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {formatPercentage(stage.percentage)} of visits
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="h-4 rounded-full bg-slate-100">
                      <div
                        className={`h-4 rounded-full ${stage.color}`}
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                    {index < conversionFunnel.length - 1 && (
                      <div className="absolute -bottom-2 left-1/2 h-2 w-0.5 -translate-x-1/2 bg-slate-300" />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Metrics</CardTitle>
              <CardDescription>
                Key performance indicators for each funnel stage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionMetrics.map((metric) => (
                  <div
                    key={metric.metric}
                    className="rounded-lg border border-slate-100 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-900">
                        {metric.metric}
                      </h4>
                      <span
                        className={`text-sm font-medium ${
                          metric.status === "good"
                            ? "text-emerald-600"
                            : metric.status === "neutral"
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      >
                        {metric.trend}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 mb-1">
                      {metric.value}
                    </p>
                    <p className="text-sm text-slate-500">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Conversion Trends</CardTitle>
              <CardDescription>
                Conversion funnel performance across all months.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-slate-500">
                      <th className="pb-3 font-medium">Month</th>
                      <th className="pb-3 font-medium">Visits</th>
                      <th className="pb-3 font-medium">Quotes</th>
                      <th className="pb-3 font-medium">Enquiries</th>
                      <th className="pb-3 font-medium">Bookings</th>
                      <th className="pb-3 font-medium">Completed</th>
                      <th className="pb-3 font-medium">Conv. Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyConversionRates.map((month) => {
                      const conversionRate =
                        (month.completed / month.visits) * 100;
                      return (
                        <tr
                          key={month.month}
                          className="border-b last:border-none"
                        >
                          <td className="py-3 font-medium text-slate-700">
                            {month.month}
                          </td>
                          <td className="py-3 text-slate-600">
                            {formatNumber(month.visits)}
                          </td>
                          <td className="py-3 text-slate-600">
                            {formatNumber(month.quotes)}
                          </td>
                          <td className="py-3 text-slate-600">
                            {formatNumber(month.enquiries)}
                          </td>
                          <td className="py-3 text-slate-600">
                            {formatNumber(month.bookings)}
                          </td>
                          <td className="py-3 text-slate-600">
                            {formatNumber(month.completed)}
                          </td>
                          <td className="py-3 font-medium text-emerald-600">
                            {formatPercentage(conversionRate)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Top Conversion Months</CardTitle>
              <CardDescription>
                Best performing months for conversions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyConversionRates
                  .sort(
                    (a, b) => b.completed / b.visits - a.completed / a.visits,
                  )
                  .slice(0, 3)
                  .map((month, index) => {
                    const rate = (month.completed / month.visits) * 100;
                    return (
                      <div
                        key={month.month}
                        className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700 font-bold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-medium text-slate-700">
                            {month.month}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">
                            {formatPercentage(rate)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {month.completed}/{month.visits} completed
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Drop-off Points</CardTitle>
              <CardDescription>
                Where potential customers are lost in the funnel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Visits → Quotes</span>
                    <span className="font-medium text-slate-900">
                      83.2% drop-off
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-4/5 rounded-full bg-red-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Quotes → Enquiries</span>
                    <span className="font-medium text-slate-900">
                      80.0% drop-off
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-4/5 rounded-full bg-red-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Enquiries → Bookings</span>
                    <span className="font-medium text-slate-900">
                      24.3% drop-off
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-1/4 rounded-full bg-amber-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Bookings → Completed</span>
                    <span className="font-medium text-slate-900">
                      9.7% drop-off
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-1/10 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Improvement Opportunities</CardTitle>
              <CardDescription>
                Areas for optimizing conversion rates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <h5 className="font-medium text-red-900 mb-1">
                    Quote Request Optimization
                  </h5>
                  <p className="text-sm text-red-700">
                    Only 16.8% of visitors request quotes. Improve
                    call-to-action visibility.
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                  <h5 className="font-medium text-amber-900 mb-1">
                    Enquiry Follow-up
                  </h5>
                  <p className="text-sm text-amber-700">
                    24.3% of enquiries don't convert to bookings. Enhance
                    follow-up process.
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                  <h5 className="font-medium text-emerald-900 mb-1">
                    Job Completion
                  </h5>
                  <p className="text-sm text-emerald-700">
                    90.3% completion rate is excellent. Maintain high service
                    quality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
