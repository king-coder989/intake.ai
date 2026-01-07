import { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapPin, X, Crosshair } from "lucide-react";

// Leave blank - user will add their API key when needed
const GOOGLE_MAPS_API_KEY = "";

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address?: string }) => void;
  onClose: () => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 21.1458,
  lng: 79.0882, // Nagpur, India
};

export const LocationPicker = ({ onLocationSelect, onClose }: LocationPickerProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const location = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setSelectedLocation(location);
    }
  }, []);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setSelectedLocation(location);
        setMapCenter(location);
        setIsLocating(false);
      },
      (err) => {
        setError("Unable to get your location. Please select manually.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      onClose();
    }
  };

  // If no API key is set, show a placeholder
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Select Location</h3>
            <button onClick={onClose} className="rounded-md p-1 hover:bg-secondary">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="mb-4 rounded-lg border border-border bg-secondary/50 p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              Google Maps API key not configured. You can still use GPS location:
            </p>
            <button
              onClick={getCurrentLocation}
              disabled={isLocating}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Crosshair className="h-4 w-4" />
              {isLocating ? "Getting Location..." : "Use Current GPS Location"}
            </button>
          </div>

          {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

          {selectedLocation && (
            <div className="mb-4 rounded-lg bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Selected Coordinates:</p>
              <p className="font-mono text-sm text-foreground">
                {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-md border border-border px-4 py-2 text-foreground hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedLocation}
              className="flex-1 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-card p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Select Location</h3>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-secondary">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="mb-4 overflow-hidden rounded-lg border border-border">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={13}
              onClick={handleMapClick}
            >
              {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
          </LoadScript>
        </div>

        <button
          onClick={getCurrentLocation}
          disabled={isLocating}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-foreground hover:bg-secondary disabled:opacity-50"
        >
          <Crosshair className="h-4 w-4" />
          {isLocating ? "Getting Location..." : "Use Current Location"}
        </button>

        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

        {selectedLocation && (
          <div className="mb-4 rounded-lg bg-secondary p-3">
            <p className="text-xs text-muted-foreground">Selected Coordinates:</p>
            <p className="font-mono text-sm text-foreground">
              {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 rounded-md border border-border px-4 py-2 text-foreground hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedLocation}
            className="flex-1 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};
