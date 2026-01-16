import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

type Props = {
  placeholder: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
};

function AutocompleteInput({ placeholder, onPlaceSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.Autocomplete(inputRef.current, {
      fields: ["formatted_address", "geometry", "name"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        onPlaceSelect(place);
      }
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
