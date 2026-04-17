"use client";

import BackgroundSetter from "@/app/ui/background-setter";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { Suspense, useEffect, useRef, useState } from "react";
import AutocompleteInput from "./components/AutocompletInput";
import MapDirections from "./components/MapDirections";
import { getPackagePricingData } from "@/app/lib/supabase/storage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ArrowRightIcon,
  CalendarIcon,
  MapPinIcon,
  TruckIcon,
  PackageIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import FileUploader from "@/components/utils/fileUploader";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const lorryTypes: Record<string, string> = {
  "1tan": "1 tonne",
  "3tan": "3 tonne",
  "5tan": "5 tonne",
  "7tan": "7 tonne",
  "10tan": "10 tonne",
};

type Location = {
  address: string;
  lat: number;
  lng: number;
};

function BookingPageContent() {
  const searchParams = useSearchParams();
  const [pickup, setPickup] = useState<any>();
  const [drop, setDrop] = useState<any>();
  const [mapDistance, setMapDistance] = useState<any>("");
  const [finalPrice, setFinalPrice] = useState<any>("");
  const [selectedLorry, setSelectedLorry] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const pkgParam = searchParams.get("pkg");
      if (
        pkgParam &&
        ["BRONZE", "SILVER", "GOLD", "GOLD+++"].includes(pkgParam)
      ) {
        setSelectedPackage(pkgParam);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (!mapDistance || selectedLorry === "") return;
    if (selectedPackage && selectedLorry !== "") {
      getPriceBasedOnKM(mapDistance, selectedPackage, selectedLorry);
    }
  }, [selectedPackage, selectedLorry]);

  function PickupChange({ from }: { from: Location }) {
    const map = useMap();
    useEffect(() => {
      if (!map || !from || mapDistance !== "") return;
      map.panTo({ lat: from.lat, lng: from.lng });
      map.setZoom(15);
    }, [map, from, mapDistance]);
    return null;
  }

  function nextMultipleOf5(n: number) {
    return Math.ceil(n / 5) * 5;
  }

  const fetchPricing = async (currentPkg: any) => {
    try {
      const data: any = await getPackagePricingData(
        "package_price",
        `${currentPkg}/price.json`,
      );
      if (data) {
        const jsonPackage = await data.text();
        const parsedJson = JSON.parse(jsonPackage);
        return parsedJson;
      }
    } catch (error) {
      console.error("Failed to fetch pricing:", error);
    }
  };

  const getPriceBasedOnKM = async (
    distanceKM: string,
    pkg: any,
    lry: string,
  ) => {
    setLoading(true);
    const allPricing = await fetchPricing(pkg);
    if (allPricing) {
      const pricing = allPricing[lry];
      const distanceTemplate = allPricing.distance;
      if (!pricing) {
        alert("No pricing exist");
        setLoading(false);
        return;
      }
      const totalDistance = Number(distanceKM.replace(" km", ""));
      const next5 = nextMultipleOf5(totalDistance);
      let kmIndex = distanceTemplate.findIndex((dt: any) => dt === next5);
      if (kmIndex < 0) {
        kmIndex = 0;
      }
      setFinalPrice(Number(pricing[kmIndex]).toFixed(2));
      setLoading(false);
    }
  };

  const isFormComplete =
    pickup && drop && selectedPackage && selectedLorry && finalPrice;

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      libraries={["places", "routes"]}
    >
      <main className="flex  flex-col p-4">
        <BackgroundSetter src="/main-background.png" />

        {/* Main Content */}
        <div className="relative z-10 flex-1 px-4 pb-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            <div className="flex flex-col">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full">
                {/* Form Header */}
                {/* <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
                  <h2 className="text-2xl font-bold">Booking Details</h2>
                  <p className="text-blue-100 mt-1 text-sm">
                    Fill in your moving details
                  </p>
                </div> */}

                {/* Form Content */}
                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="flex-1 px-6 py-5 space-y-5 overflow-y-auto"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPinIcon className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-800">
                        Pickup & Dropoff
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                          From
                        </label>
                        <div className="relative">
                          <AutocompleteInput
                            placeholder="Enter pickup location"
                            onPlaceSelect={(place: Location) => {
                              setPickup(place);
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                          To
                        </label>
                        <div className="relative">
                          <AutocompleteInput
                            placeholder="Enter dropoff location"
                            onPlaceSelect={(place: Location) => {
                              setDrop(place);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-200" />

                  {/* Package & Lorry Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 mb-3">
                      <PackageIcon className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-gray-800">
                        Service & Vehicle
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                          Service Package
                        </label>
                        <Select
                          value={
                            selectedPackage || searchParams.get("pkg") || ""
                          }
                          onValueChange={(value) => {
                            setSelectedPackage(value);
                          }}
                        >
                          <SelectTrigger className="w-full h-10 border-gray-300 hover:border-blue-400 transition-colors">
                            <SelectValue placeholder="Choose your package" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BRONZE">BRONZE</SelectItem>
                            <SelectItem value="SILVER">SILVER</SelectItem>
                            <SelectItem value="GOLD">GOLD</SelectItem>
                            <SelectItem value="GOLD+++">GOLD+++</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">
                          Vehicle Size
                        </label>
                        <Select
                          value={selectedLorry}
                          onValueChange={(value) => {
                            setSelectedLorry(value);
                          }}
                        >
                          <SelectTrigger className="w-full h-10 border-gray-300 hover:border-blue-400 transition-colors">
                            <SelectValue placeholder="Choose vehicle size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1tan">1 Tonne</SelectItem>
                            <SelectItem value="3tan">3 Tonne</SelectItem>
                            <SelectItem value="5tan">5 Tonne</SelectItem>
                            <SelectItem value="7tan">7 Tonne</SelectItem>
                            <SelectItem value="10tan">10 Tonne</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-200" />

                  {/* Summary Section */}
                  {mapDistance && (
                    <div className="space-y-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 font-medium">
                          Distance:
                        </span>
                        <span className="font-bold text-blue-600">
                          {mapDistance}
                        </span>
                      </div>
                    </div>
                  )}

                  {finalPrice && (
                    <div className="space-y-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                      <p className="text-xs text-gray-600 font-medium text-center">
                        📋 Package Details
                      </p>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-gray-700">
                          <span className="font-semibold">
                            {selectedPackage}
                          </span>{" "}
                          Package
                        </span>
                        <span className="text-gray-700">
                          <span className="font-semibold">
                            {lorryTypes[selectedLorry]}
                          </span>
                        </span>
                      </div>
                      <Separator className="bg-green-200" />
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-gray-800 font-semibold">
                          Estimated Price:
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          RM {finalPrice}
                        </span>
                      </div>
                    </div>
                  )}

                  {!isFormComplete && (
                    <div className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg border border-amber-200">
                      <AlertCircleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        <span className="font-semibold">
                          Complete all fields
                        </span>{" "}
                        to proceed with your booking
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    type="button"
                    className={cn(
                      "w-full h-11 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5",
                      isFormComplete
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed",
                    )}
                    onClick={() => {
                      if (isFormComplete) {
                        const bookingData = {
                          pickup: pickup?.address || "",
                          drop: drop?.address || "",
                          distance: mapDistance,
                          selectedPackage,
                          selectedLorry,
                          finalPrice,
                        };
                        sessionStorage.setItem(
                          "bookingData",
                          JSON.stringify(bookingData),
                        );
                        window.location.href = "/booking/review";
                      }
                    }}
                    disabled={!isFormComplete}
                  >
                    Review & Proceed
                    <ArrowRightIcon className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div className="rounded-2xl overflow-hidden shadow-2xl h-72 lg:h-full">
              <Map
                mapId="76dd9a2c49a5651ce5a42c9d"
                style={{ width: "100%", height: "100%" }}
                defaultCenter={{
                  lat: 3.826132979861204,
                  lng: 102.08943882724553,
                }}
                defaultZoom={8}
                gestureHandling="greedy"
              >
                {pickup && (
                  <Marker
                    position={{ lat: pickup.lat, lng: pickup.lng }}
                    draggable
                    onDragEnd={(e) => {
                      setPickup({
                        lat: e.latLng!.lat(),
                        lng: e.latLng!.lng(),
                      });
                    }}
                  />
                )}

                {drop && (
                  <Marker
                    position={{ lat: drop.lat, lng: drop.lng }}
                    draggable
                    onDragEnd={(e) => {
                      setDrop({
                        lat: e.latLng!.lat(),
                        lng: e.latLng!.lng(),
                      });
                    }}
                  />
                )}

                <MapDirections
                  from={pickup}
                  to={drop}
                  onRoute={(d: any, t) => {
                    setMapDistance(d);
                  }}
                />
                <PickupChange from={pickup} />
              </Map>
            </div>
          </div>
        </div>
      </main>
    </APIProvider>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-900 pt-20 text-slate-300">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-blue-300 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading booking form...</p>
          </div>
        </main>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}
