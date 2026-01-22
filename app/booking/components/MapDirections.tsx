import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

type Location = {
  address: string;
  lat: number;
  lng: number;
};

function MapDirections({
  from,
  to,
  onRoute,
}: {
  from: Location | null;
  to: Location | null;
  onRoute: (distance: string, duration: string) => void;
}) {
  const routesLib = useMapsLibrary("routes");
  const map = useMap();

  useEffect(() => {
    if (!routesLib || !map || !from || !to) return;

    const directionsService = new routesLib.DirectionsService();
    const directionsRenderer = new routesLib.DirectionsRenderer({
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeOpacity: 0.8,
        strokeColor: "#1E90FF",
        strokeWeight: 7,
      },
    });

    directionsService.route(
      {
        origin: { lat: from.lat, lng: from.lng },
        destination: { lat: to.lat, lng: to.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          directionsRenderer.setDirections(result);

          const leg = result.routes[0].legs[0];
          onRoute(leg.distance!.text, leg.duration!.text);
        }
      }
    );

    return () => directionsRenderer.setMap(null);
  }, [routesLib, map, from, to]);

  return null;
}

export default MapDirections;
