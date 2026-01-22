"use client";

import BackgroundSetter from "@/app/ui/background-setter";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import AutocompleteInput from "./components/AutocompletInput";
import MapDirections from "./components/MapDirections";
import {
  getPackagePricingData,
  uploadFileToStorage,
} from "@/app/lib/supabase/storage";
import readXlsxFile, { readSheetNames } from "read-excel-file";

type Location = {
  address: string;
  lat: number;
  lng: number;
};

export default function BookingPage() {
  const [userlocation, setUserlocation] = useState({
    lat: 3.140853,
    lng: 101.693207,
  });
  const [pickup, setPickup] = useState<any>();
  const [drop, setDrop] = useState<any>();
  const [mapDistance, setMapDistance] = useState<any>("");
  const [pricing, setPricing] = useState(null);
  const [distanceTemplate, setDistanceTemplate] = useState<any[]>([]);
  const [finalPrice, setFinalPrice] = useState<any>("");
  const [lorry, setLorry] = useState<string>("1tan");
  const [selectedPackage, setSelectedPackage] = useState<any>("BRONZE");

  useEffect(() => {
    let nav = navigator.geolocation;
    if (nav) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserlocation({ lat: pos.lat, lng: pos.lng });
        },
      );
    }
  }, []);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const data: any = await getPackagePricingData(
          "package_price",
          `${selectedPackage}/price.json`,
        );
        if (data) {
          const jsonPackage = await data.text();
          const packageTemplate = JSON.parse(jsonPackage);
          setPricing(packageTemplate[lorry]);
          setDistanceTemplate(packageTemplate.distance);
        }
      } catch (error) {
        console.error("Failed to fetch pricing:", error);
      }
    };

    fetchPricing();
  }, [selectedPackage, lorry]);

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
    console.log(n);
    return Math.ceil(n / 5) * 5;
  }

  const getPriceBasedOnKM = (distanceKM: String) => {
    console.log(pricing);
    if (!pricing) {
      alert("No pricing exist");
      return;
    }
    const totalDistance = Number(distanceKM.replace(" km", ""));
    const next5 = nextMultipleOf5(totalDistance);
    let kmIndex = distanceTemplate.findIndex((dt: any) => dt === next5);
    if (kmIndex < 0) {
      kmIndex = 0;
    }
    setFinalPrice(Number(pricing[kmIndex]).toFixed(2));
  };

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      libraries={["places", "routes"]}
    >
      <main className="flex min-h-screen flex-col p-6">
        <BackgroundSetter src="/main-background.png" />

        <div className="grid grid-cols-2 p-10 gap-5">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-2xl font-semibold text-white">Booking</h1>
            <div className="rounded-lg bg-white p-6 shadow w-[30vw]">
              <form className="grid gap-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className={pricing ? "hidden" : ""}>
                    <input
                      type="file"
                      onChange={(e: any) => {
                        readSheetNames(e.target.files[0]).then((sheetnames) => {
                          sheetnames.forEach((packageName) => {
                            readXlsxFile(e.target.files[0], {
                              sheet: packageName,
                            }).then(async (rows) => {
                              let distance: any[] = [],
                                tan1: any[] = [],
                                tan3: any[] = [],
                                tan5: any[] = [],
                                tan7: any[] = [],
                                tan10: any[] = [];
                              for (let i = 4; i < 101; i++) {
                                distance.push(rows[i][0]);
                                tan1.push(rows[i][2]);
                                tan3.push(rows[i][3]);
                                tan5.push(rows[i][4]);
                                tan7.push(rows[i][8]);
                                tan10.push(rows[i][12]);
                              }
                              let pricePackage = {
                                distance: distance,
                                "1tan": tan1,
                                "3tan": tan3,
                                "5tan": tan5,
                                "7tan": tan7,
                                "10tan": tan10,
                              };
                              const json = JSON.stringify(
                                pricePackage,
                                null,
                                2,
                              );
                              const fileName = `price.json`;
                              const file = new File([json], fileName, {
                                type: "application/json",
                              });
                              console.log(file);
                              try {
                                await uploadFileToStorage(
                                  "package_price",
                                  `${packageName}/${fileName}`,
                                  file,
                                );
                              } catch (err) {
                                console.log(err);
                              }
                            });
                          });
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label>Choose preferred lorry:</label>
                    <select
                      onChange={(e) => {
                        setLorry(e.target.value);
                      }}
                    >
                      <option value="1tan">1 tan</option>
                      <option value="3tan">3 tan</option>
                      <option value="5tan">5 tan</option>
                      <option value="7tan">7 tan</option>
                      <option value="10tan">10 tan</option>
                    </select>
                  </div>
                  <div>
                    <label>Choose preferred package:</label>
                    <select
                      onChange={(e) => {
                        setSelectedPackage(e.target.value);
                      }}
                    >
                      <option value="BRONZE">BRONZE</option>
                      <option value="SILVER">SILVER</option>
                      <option value="GOLD">GOLD</option>
                      <option value="GOLD++">GOLD++</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded border px-3 py-2"
                    />
                  </div>
                  {/* <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Vehicle
                    </label>
                    <select className="w-full rounded border px-3 py-2">
                      <option>Small van</option>
                      <option>Large van</option>
                      <option>Truck</option>
                    </select>
                  </div> */}
                </div>
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
                  Distance:{" "}
                  {mapDistance !== ""
                    ? mapDistance
                    : "Select pickup and drop location."}
                </div>
                <div>Estimated Amount: RM {finalPrice ?? ""}</div>
                <button
                  type="submit"
                  className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="w-full h-full">
            <Map
              mapId="76dd9a2c49a5651ce5a42c9d"
              style={{ width: "auto", height: "70vh" }}
              defaultCenter={userlocation}
              defaultZoom={userlocation.lat === 3.140853 ? 8 : 15}
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
                  getPriceBasedOnKM(d);
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
