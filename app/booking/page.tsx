"use client";

import BackgroundSetter from "@/app/ui/background-setter";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
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
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
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

export default function BookingPage() {
  const searchParams = useSearchParams();
  // const [userlocation, setUserlocation] = useState({
  //   lat: 3.140853,
  //   lng: 101.693207,
  // });
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
    // let nav = navigator.geolocation;
    // if (nav) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position: GeolocationPosition) => {
    //       const pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       };
    //       setUserlocation({ lat: pos.lat, lng: pos.lng });
    //     },
    //   );
    // }
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

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      libraries={["places", "routes"]}
    >
      <main className="flex max-h-screen flex-col p-6">
        <BackgroundSetter src="/main-background.png" />

        {/* <div className="grid grid-cols-1">
          <h1 className="mx-auto max-w-3xl text-5xl font-semibold text-white">
            Booking
          </h1>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-5 h-[80vh]">
          <div className="mx-auto w-full">
            <div className="w-full rounded-lg bg-white p-6 shadow w-[45vw]">
              <form className="grid gap-4" onSubmit={() => {}}>
                <div className="grid grid-cols-1 gap-4">
                  {/* <div className={allPricing ? "hidden" : ""}>
                    <FileUploader />
                  </div> */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      From
                    </label>
                    <AutocompleteInput
                      placeholder="Pickup Location"
                      onPlaceSelect={(place: Location) => {
                        setPickup(place);
                      }}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      To
                    </label>
                    <AutocompleteInput
                      placeholder="Dropoff Location"
                      onPlaceSelect={(place: Location) => {
                        setDrop(place);
                      }}
                    />
                  </div>
                  <div>
                    <label>Selected package:</label>
                    <Select
                      value={selectedPackage || searchParams.get("pkg") || ""}
                      onValueChange={(value) => {
                        setSelectedPackage(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose preferred package" />
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
                    <label>Selected lorry:</label>
                    <Select
                      value={selectedLorry}
                      onValueChange={(value) => {
                        setSelectedLorry(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose preferred lorry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1tan">1 tonne</SelectItem>
                        <SelectItem value="3tan">3 tonne</SelectItem>
                        <SelectItem value="5tan">5 tonne</SelectItem>
                        <SelectItem value="7tan">7 tonne</SelectItem>
                        <SelectItem value="10tan">10 tonne</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* <div>
                    <label>Selected date:</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          data-empty={selectedDate}
                          className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
                        >
                          {selectedDate ? (
                            format(selectedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon data-icon="inline-end" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          defaultMonth={selectedDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div> */}
                </div>
                <Separator />
                <div className={`${!mapDistance && "hidden"}`}>
                  <Item variant="outline">
                    <ItemContent>
                      <ItemTitle>Total Distance</ItemTitle>
                      <ItemDescription>
                        <span>
                          {mapDistance !== ""
                            ? mapDistance
                            : "Select pickup and drop location."}
                        </span>
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </div>
                <div className={`${!finalPrice && "hidden"}`}>
                  <Item variant="outline">
                    <ItemContent>
                      <ItemTitle>Package Description</ItemTitle>
                      <ItemDescription>
                        <span>
                          <b>{selectedPackage}</b> package{" "}
                          <b>{lorryTypes[selectedLorry]}</b> lorry
                        </span>
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                  <Item variant="outline">
                    <ItemContent>
                      <ItemTitle>Basic Amount:</ItemTitle>
                      <ItemDescription>
                        <b>RM {finalPrice ?? ""}</b>
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="mt-2 bg-yellow-500 text-black hover:bg-yellow-300"
                >
                  <Link href="/booking/review">
                    <ArrowRightIcon className={cn("size-4")} /> Proceed
                  </Link>
                </Button>
              </form>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden h-[80vh]">
            <Map
              mapId="76dd9a2c49a5651ce5a42c9d"
              style={{ width: "auto", height: "80vh" }}
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
                    setPickup({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });
                  }}
                />
              )}

              {drop && (
                <Marker
                  position={{ lat: drop.lat, lng: drop.lng }}
                  draggable
                  onDragEnd={(e) => {
                    setDrop({ lat: e.latLng!.lat(), lng: e.latLng!.lng() });
                  }}
                />
              )}

              <MapDirections
                from={pickup}
                to={drop}
                onRoute={(d: any, t) => {
                  setMapDistance(d);
                  // getPriceBasedOnKM(d);
                }}
              />
              <PickupChange from={pickup} />
            </Map>
          </div>
        </div>
      </main>
    </APIProvider>
  );
}
