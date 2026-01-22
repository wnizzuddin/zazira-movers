import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

type Location = {
  address: string;
  lat: number;
  lng: number;
};

type Props = {
  placeholder: string;
  onPlaceSelect: (loc: Location) => void;
};

function AutocompleteInput({ placeholder, onPlaceSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.Autocomplete(inputRef.current, {
      fields: ["formatted_address", "geometry"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      onPlaceSelect({
        address: place.formatted_address!,
        lat: place.geometry.location!.lat(),
        lng: place.geometry.location!.lng(),
      });
    });
  }, [places]);

  return (
    <input
      ref={inputRef}
      className="w-full rounded border px-3 py-2"
      placeholder={placeholder}
    />
  );
}

export default AutocompleteInput;
