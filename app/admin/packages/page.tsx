"use client";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/utils/fileUploader";
import {
  downloadJsonFromStorage,
  getPackagePricingData,
} from "@/app/lib/supabase/storage";

type PackageData = {
  name: string;
  price: number;
  bookings: number;
  revenue: number;
  percentage: number;
  hex: string;
  features: string[];
  monthlyTrend: number[];
};

const packageDetails: PackageData[] = [
  {
    name: "Bronze",
    price: 800,
    bookings: 93,
    revenue: 74400,
    percentage: 24,
    hex: "#f59e0b",
    features: [
      "Basic moving service",
      "2 movers",
      "2 hours included",
      "Basic insurance",
    ],
    monthlyTrend: [8, 7, 9, 8, 7, 8, 9, 8, 7, 9, 8, 7],
  },
  {
    name: "Silver",
    price: 1200,
    bookings: 121,
    revenue: 145200,
    percentage: 31,
    hex: "#94a3b8",
    features: [
      "Standard moving service",
      "3 movers",
      "4 hours included",
      "Standard insurance",
      "Packing materials",
    ],
    monthlyTrend: [10, 11, 12, 10, 9, 11, 12, 11, 10, 12, 11, 10],
  },
  {
    name: "Gold",
    price: 1800,
    bookings: 113,
    revenue: 203400,
    percentage: 29,
    hex: "#0ea5e9",
    features: [
      "Premium moving service",
      "4 movers",
      "6 hours included",
      "Full insurance",
      "Packing service",
      "Storage option",
    ],
    monthlyTrend: [9, 10, 11, 9, 8, 10, 11, 10, 9, 11, 10, 9],
  },
  {
    name: "Gold+++",
    price: 2500,
    bookings: 62,
    revenue: 155000,
    percentage: 16,
    hex: "#22c55e",
    features: [
      "Luxury moving service",
      "5+ movers",
      "8 hours included",
      "Premium insurance",
      "Full packing service",
      "Storage included",
      "White glove service",
    ],
    monthlyTrend: [5, 6, 7, 5, 4, 6, 7, 6, 5, 7, 6, 5],
  },
];

const monthlyTotals = packageDetails[0].monthlyTrend.map((_, index) =>
  packageDetails.reduce((sum, pkg) => sum + pkg.monthlyTrend[index], 0),
);

const fetchPricing = async (currentPkg: any) => {
  try {
    const data: any = await getPackagePricingData(
      "package_price",
      `${currentPkg.toUpperCase()}/price.json`,
    );
    if (data) {
      const jsonPackage = await data.text();
      const parsedJson = JSON.parse(jsonPackage);
      console.log(parsedJson);
      return parsedJson;
    }
  } catch (error) {
    console.error("Failed to fetch pricing:", error);
  }
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PackagesPage() {
  const [pricingData, setPricingData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const [resetKey, setResetKey] = useState(0);

  const fetchAllPricing = async () => {
    setLoading(true);
    const newPricingData: Record<string, any> = {};
    for (const pkg of packageDetails) {
      const data = await fetchPricing(pkg.name);
      if (data) {
        newPricingData[pkg.name] = data;
      }
    }
    setPricingData(newPricingData);
    setLoading(false);
    setResetKey((prev) => prev + 1);
  };

  useEffect(() => {
    fetchAllPricing();
  }, []);

  useEffect(() => {
    if (Object.keys(pricingData).length > 0 && !activeTab) {
      setActiveTab(Object.keys(pricingData)[0]);
    }
  }, [pricingData, activeTab]);

  const totalRevenue = packageDetails.reduce(
    (sum, pkg) => sum + pkg.revenue,
    0,
  );
  const totalBookings = packageDetails.reduce(
    (sum, pkg) => sum + pkg.bookings,
    0,
  );
  const averageRevenuePerBooking = Math.round(totalRevenue / totalBookings);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-sky-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Package Analytics
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Detailed breakdown of service packages, pricing, and performance
            metrics for Zazira Movers.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <FileUploader key={resetKey} />
            <Button onClick={fetchAllPricing} disabled={loading}>
              {loading ? "Updating..." : "Update Pricing Data"}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">
                {formatCurrency(totalRevenue)}
              </CardTitle>
              <CardDescription>Total Package Revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
                From all service packages
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">{totalBookings}</CardTitle>
              <CardDescription>Total Bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Across all packages</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">
                {formatCurrency(averageRevenuePerBooking)}
              </CardTitle>
              <CardDescription>Average Revenue per Booking</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Overall average</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">4</CardTitle>
              <CardDescription>Active Packages</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Service tiers available</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6">
          {packageDetails.map((pkg) => (
            <Card key={pkg.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: pkg.hex }}
                    />
                    <CardTitle className="text-xl">
                      {pkg.name} Package
                    </CardTitle>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">
                      {formatCurrency(pkg.price)}
                    </p>
                    <p className="text-sm text-slate-500">per booking</p>
                  </div>
                </div>
                <CardDescription>
                  {pkg.bookings} bookings • {pkg.percentage}% of total •{" "}
                  {formatCurrency(pkg.revenue)} revenue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 font-semibold text-slate-900">
                      Package Features
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-semibold text-slate-900">
                      Monthly Trend
                    </h4>
                    <div className="flex h-16 items-end gap-1">
                      {pkg.monthlyTrend.map((value, index) => {
                        const height =
                          (value / Math.max(...pkg.monthlyTrend)) * 100;
                        return (
                          <div
                            key={index}
                            className="flex flex-1 flex-col items-center justify-end"
                          >
                            <div
                              className="w-full rounded-sm"
                              style={{
                                height: `${Math.max(height, 8)}%`,
                                backgroundColor: pkg.hex,
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-slate-500">
                      <span>Jan</span>
                      <span>Dec</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Package Performance Comparison</CardTitle>
              <CardDescription>
                Revenue and booking metrics across all packages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {packageDetails
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((pkg) => (
                    <div key={pkg.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: pkg.hex }}
                          />
                          <span className="font-medium text-slate-700">
                            {pkg.name}
                          </span>
                        </div>
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(pkg.revenue)}
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-100">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${(pkg.revenue / totalRevenue) * 100}%`,
                            backgroundColor: pkg.hex,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{pkg.bookings} bookings</span>
                        <span>{pkg.percentage}% share</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Package Pricing Analysis</CardTitle>
              <CardDescription>
                Value proposition and profitability of each package.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {packageDetails.map((pkg) => {
                  const profitMargin = ((pkg.price - 400) / pkg.price) * 100;
                  const roi = (pkg.revenue / (pkg.price * pkg.bookings)) * 100;

                  return (
                    <div
                      key={pkg.name}
                      className="rounded-lg border border-slate-100 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: pkg.hex }}
                          />
                          <span className="font-semibold text-slate-900">
                            {pkg.name}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-slate-900">
                          {formatCurrency(pkg.price)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Est. Profit Margin</p>
                          <p className="font-semibold text-emerald-600">
                            {profitMargin.toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">ROI</p>
                          <p className="font-semibold text-sky-600">
                            {roi.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:py-10">
        <h2 className="text-2xl font-bold mb-6">Pricing Data</h2>
        {Object.keys(pricingData).length === 0 && !loading ? (
          <p>No pricing data available. Upload files and update.</p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Pricing Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 w-full">
                <div className="flex border-b border-slate-200">
                  {Object.keys(pricingData).map((pkgName) => (
                    <button
                      key={pkgName}
                      onClick={() => setActiveTab(pkgName)}
                      className={`flex-1 px-4 py-2 text-sm font-medium text-center ${
                        activeTab === pkgName
                          ? "border-b-2 border-sky-500 text-sky-600"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {pkgName}
                    </button>
                  ))}
                </div>
              </div>
              {activeTab && pricingData[activeTab] && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Distance (km)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          1 Tan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          3 Tan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          5 Tan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          7 Tan
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          10 Tan
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {pricingData[activeTab].distance?.map(
                        (dist: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {dist}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {formatCurrency(
                                pricingData[activeTab]["1tan"]?.[index] || 0,
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {formatCurrency(
                                pricingData[activeTab]["3tan"]?.[index] || 0,
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {formatCurrency(
                                pricingData[activeTab]["5tan"]?.[index] || 0,
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {formatCurrency(
                                pricingData[activeTab]["7tan"]?.[index] || 0,
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {formatCurrency(
                                pricingData[activeTab]["10tan"]?.[index] || 0,
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
