import { Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

type Location = {
  address: string;
  lat: number;
  lng: number;
};

function MapMarkers({
  from,
  setFrom,
  to,
  setTo,
}: {
  from: Location;
  to: Location;
  setFrom: (loc: Location) => void;
  setTo: (loc: Location) => void;
}) {
  const geocoderLib = useMapsLibrary("geocoding");

  const reverseGeocode = (
    lat: number,
    lng: number,
    callback: (address: string) => void
  ) => {
    if (!geocoderLib) return;

    const geocoder = new geocoderLib.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        callback(results[0].formatted_address);
      }
    });
  };

  return (
    <>
      {from && (
        <Marker
          position={{ lat: from.lat, lng: from.lng }}
          draggable
          onDragEnd={(e) => {
            if (!e.latLng) return;
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();

            reverseGeocode(lat, lng, (address) => {
              setFrom({ lat, lng, address });
            });
          }}
        />
      )}

      {to && (
        <Marker
          position={{ lat: to.lat, lng: to.lng }}
          draggable
          onDragEnd={(e) => {
            if (!e.latLng) return;
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();

            reverseGeocode(lat, lng, (address) => {
              setTo({ lat, lng, address });
            });
          }}
        />
      )}
    </>
  );
}

export default MapMarkers;
