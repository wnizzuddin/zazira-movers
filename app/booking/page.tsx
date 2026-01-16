"use client";

import BackgroundSetter from "@/app/ui/background-setter";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import AutocompleteInput from "./components/AutocompletInput";

export default function BookingPage() {
  const [userlocation, setUserlocation] = useState({
    lat: 3.140853,
    lng: 101.693207,
  });

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
        }
      );
    }
  }, []);

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      libraries={["places"]}
    >
      <main className="flex min-h-screen flex-col p-6">
        <BackgroundSetter src="/main-background.png" />

        <div className="grid grid-cols-2 p-10 gap-5">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-2xl font-semibold text-white">Booking</h1>
            <div className="rounded-lg bg-white p-6 shadow w-[30vw]">
              <form className="grid gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    From
                  </label>
                  <AutocompleteInput
                    placeholder="Pickup"
                    onPlaceSelect={(place: google.maps.places.PlaceResult) => {
                      console.log(place);
                    }}
                  />
                  <input
                    className="w-full rounded border px-3 py-2"
                    placeholder="Pickup location"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    To
                  </label>
                  <input
                    className="w-full rounded border px-3 py-2"
                    placeholder="Dropoff location"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
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
              <AdvancedMarker position={userlocation} />
            </Map>
          </div>
        </div>
      </main>
    </APIProvider>
  );
}
