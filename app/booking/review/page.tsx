"use client";

import BackgroundSetter from "@/app/ui/background-setter";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  CheckCircleIcon,
  MapPinIcon,
  TruckIcon,
  SparklesIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";
import { useState, useEffect } from "react";

type PackageFeatures = {
  [key: string]: string[];
};

const packageFeatures: PackageFeatures = {
  BRONZE: [
    "Basic moving service",
    "2 movers",
    "2 hours included",
    "Basic insurance",
  ],
  SILVER: [
    "Standard moving service",
    "3 movers",
    "4 hours included",
    "Standard insurance",
    "Packing materials",
  ],
  GOLD: [
    "Premium moving service",
    "4 movers",
    "6 hours included",
    "Full insurance",
    "Packing service",
    "Storage option",
  ],
  "GOLD+++": [
    "Luxury moving service",
    "5+ movers",
    "8 hours included",
    "Premium insurance",
    "Full packing service",
    "Storage included",
    "White glove service",
  ],
};

const packageColors: { [key: string]: string } = {
  BRONZE: "border-amber-500 bg-amber-50",
  SILVER: "border-slate-400 bg-slate-50",
  GOLD: "border-blue-400 bg-blue-50",
  "GOLD+++": "border-green-500 bg-green-50",
};

const packageBadgeColors: { [key: string]: string } = {
  BRONZE: "bg-amber-500 text-white",
  SILVER: "bg-slate-400 text-white",
  GOLD: "bg-blue-400 text-white",
  "GOLD+++": "bg-green-500 text-white",
};

const lorryTypes: Record<string, string> = {
  "1tan": "1 tonne",
  "3tan": "3 tonne",
  "5tan": "5 tonne",
  "7tan": "7 tonne",
  "10tan": "10 tonne",
};

interface BookingData {
  pickup?: string;
  drop?: string;
  distance?: string;
  selectedPackage?: string;
  selectedLorry?: string;
  finalPrice?: string;
}

export default function ReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve booking data from session storage or URL params
    const storedData = sessionStorage.getItem("bookingData");

    if (storedData) {
      try {
        setBookingData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing booking data:", error);
      }
    } else {
      // Build from URL params if available
      const data: BookingData = {};
      if (searchParams.get("pickup"))
        data.pickup = searchParams.get("pickup") || "";
      if (searchParams.get("drop")) data.drop = searchParams.get("drop") || "";
      if (searchParams.get("distance"))
        data.distance = searchParams.get("distance") || "";
      if (searchParams.get("pkg"))
        data.selectedPackage = searchParams.get("pkg") || "";
      if (searchParams.get("lorry"))
        data.selectedLorry = searchParams.get("lorry") || "";
      if (searchParams.get("price"))
        data.finalPrice = searchParams.get("price") || "";

      setBookingData(data);
    }

    setIsLoading(false);
  }, [searchParams]);

  const handleGoBack = () => {
    router.back();
  };

  const handleProceedToPayment = () => {
    // Store the booking data for payment page
    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
    router.push("/booking/payment");
  };

  if (isLoading) {
    return (
      <main className="flex max-h-screen flex-col p-6">
        <BackgroundSetter src={"/main-background.png"} />
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-lg">Loading...</p>
        </div>
      </main>
    );
  }

  const pkg = bookingData.selectedPackage || "";
  const features = packageFeatures[pkg] || [];
  const colorClass = packageColors[pkg] || "border-gray-300 bg-gray-50";
  const badgeColorClass = packageBadgeColors[pkg] || "bg-gray-500 text-white";

  return (
    <main className="min-h-screen flex flex-col p-6">
      <BackgroundSetter src={"/main-background.png"} />

      {/* Header */}
      <div className="flex justify-center gap-2 mb-8">
        <h1 className="text-4xl font-bold text-white">Review Your Booking</h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column - Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Route Information Card */}
          <Card className="bg-white/95 border-white shadow-lg">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" />
                Trip Details
              </CardTitle>
              {/* <CardDescription className="text-blue-100">
                Your pickup and dropoff locations
              </CardDescription> */}
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Pickup Location */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-600">
                    Pickup Location
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {bookingData.pickup || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Distance Indicator */}
              <div className="flex items-center justify-center py-2">
                <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
                <span className="px-3 text-sm text-gray-500 font-medium">
                  {bookingData.distance || "0 km"}
                </span>
                <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>
              </div>

              {/* Dropoff Location */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-600">
                    Dropoff Location
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {bookingData.drop || "Not specified"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Truck & Package Selection Card */}
          <Card className="bg-white/95 border-white shadow-lg">
            <CardHeader className="bg-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <TruckIcon className="h-5 w-5" />
                Vehicle & Package
              </CardTitle>
              {/* <CardDescription className="text-purple-100">
                Your selected vehicle and service package
              </CardDescription> */}
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Lorry Type */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Vehicle Type
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {bookingData.selectedLorry
                      ? lorryTypes[bookingData.selectedLorry]
                      : "Not selected"}
                  </p>
                </div>

                {/* Package Type */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    Service Package
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${badgeColorClass}`}
                    >
                      {bookingData.selectedPackage || "Not selected"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Package Features & Pricing */}
        <div className="space-y-6">
          {/* Package Details Card */}
          <Card className={`border-2 shadow-lg ${colorClass}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {bookingData.selectedPackage || "Package"}
                </CardTitle>
                <SparklesIcon className="h-5 w-5 text-amber-600" />
              </div>
              <CardDescription>What's included in this package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {features.length > 0 ? (
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No features available</p>
              )}
            </CardContent>
          </Card>

          {/* Price Summary Card */}
          <Card className="bg-white/95 border-white shadow-lg sticky top-6">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg pb-3">
              <CardTitle className="text-lg">Price Summary</CardTitle>
              <CardDescription className="text-green-100">
                Your booking cost breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {/* Base Price */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Base Price</span>
                <span className="text-gray-900 font-semibold">
                  RM {bookingData.finalPrice || "0.00"}
                </span>
              </div>

              {/* Separator */}
              <Separator />

              {/* Total Price */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-900">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-green-600">
                  RM {bookingData.finalPrice || "0.00"}
                </span>
              </div>

              {/* Info Text */}
              <p className="text-xs text-gray-500 text-center mt-4">
                ✓ Price calculated based on distance and selected package
              </p>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleProceedToPayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 rounded-lg flex items-center justify-center gap-2"
                  size="lg"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGoBack}
                  className="w-full font-semibold py-6"
                  size="lg"
                >
                  Edit Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
