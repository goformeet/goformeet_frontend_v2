"use client";

import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { cn } from "@/lib/utils"; // Assuming cn is used for conditional classnames
import { FormLabel } from "../ui/form";
import { Button } from "../ui/button";

interface MapComponentProps {
  handleLocation: (location: { lat: number; lng: number } | null, directionsUrl: string | null) => void;
  defaultLocationName?: string;
  location?: {
    type: "Point";
    coordinates: [number, number]; // [Longitude, Latitude]
  } | null;
}

const DEFAULT_LOCATION = { lat: 12.9716, lng: 77.5946 }; // Bangalore

const GooglemapCard: React.FC<MapComponentProps> = ({ handleLocation, defaultLocationName, location }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [address, setAddress] = useState<string>(""); 
  const [directionsUrl, setDirectionsUrl] = useState<string | null>(null); // State to hold directionsUrl
  const [initialLocation, setInitialLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    const fetchAddress = async (coordinates: [number, number]) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[1]},${coordinates[0]}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const addressFound = response.data.results[0]?.formatted_address || "Address not found";
        setAddress(addressFound); // Update the address state
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    if (location && location.coordinates[0] !== 0 && location.coordinates[1] !== 0) {
      const coordinates = location.coordinates;
      const initialPosition = {
        lat: coordinates[1], // Latitude
        lng: coordinates[0], // Longitude
      };
      setMarkerPosition(initialPosition);
      setInitialLocation(initialPosition); // Store initial location
      fetchAddress(coordinates); // Fetch address based on coordinates
    } else {
      setMarkerPosition(DEFAULT_LOCATION);
      setInitialLocation(DEFAULT_LOCATION); // Set initial location as default if not provided
      fetchAddress([DEFAULT_LOCATION.lng, DEFAULT_LOCATION.lat]); // Optionally fetch address for default location
    }
  }, [location]);

  const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(newLocation);
  
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLocation.lat},${newLocation.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const addressFound = response.data.results[0]?.formatted_address || "Address not found";
        setAddress(addressFound); // Update the address state
  
        // Generate directions URL based on selected location
        const newDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${newLocation.lat},${newLocation.lng}`;
        console.log("New Directions URL:", newDirectionsUrl); // Log to check if it's correct
        setDirectionsUrl(newDirectionsUrl); // Save the directions URL
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }
  };

  const handleAddressChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputAddress = event.target.value;
    setAddress(inputAddress);
    
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${inputAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const locationData = response.data.results[0];
      
      if (locationData) {
        const location = locationData.geometry.location;
        setMarkerPosition({
          lat: location.lat,
          lng: location.lng,
        });
        setDirectionsUrl(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleSaveLocation = () => {
    // If the marker position hasn't been updated, send the initial location.
    const locationToSend = !markerPosition || (markerPosition.lat === initialLocation.lat && markerPosition.lng === initialLocation.lng)
      ? initialLocation
      : markerPosition;
  
    // If directionsUrl is null, set a fallback URL
    const finalDirectionsUrl = directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${locationToSend.lat},${locationToSend.lng}`;
  
    // Send both location and directionsUrl
    handleLocation(locationToSend, finalDirectionsUrl); // Send the location and directions URL
    setIsMapVisible(false); // Optionally close the map after saving
  };

  if (loadError) return <div>Error loading Google Maps</div>;

  return (
    <div className="mb-4">
      <FormLabel className="pb-2">Enter Location</FormLabel>
      <div className="relative mb-4" onClick={() => setIsMapVisible(true)}>
        <input
          type="text"
          value={address}
          onChange={handleAddressChange} // Allow editing the address
          className="flex h-10 w-full rounded-md border border-input bg-background mt-2 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Select location"
        />
        <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600">
          <FaMapMarkerAlt size={20} />
        </button>
      </div>
      {isLoaded && isMapVisible && (
        <div className="relative">
          <button
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
            onClick={() => setIsMapVisible(false)}
          >
            <span className="text-red-500">X</span>
          </button>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={markerPosition || DEFAULT_LOCATION}
            zoom={12}
            onLoad={onMapLoad}
            onClick={onMapClick}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
          <Button type="button" className="mt-4" onClick={handleSaveLocation}>
            Confirm Location
          </Button>
        </div>
      )}
    </div>
  );
};

export default GooglemapCard;
