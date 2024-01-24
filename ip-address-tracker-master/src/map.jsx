/** @format */

import React, { useRef, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "./map.css";

const Map = ({ lat, lng }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    // Check if the map reference is available and update the view
    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 13);
    }
  }, [lat, lng]);

  const myIcon = L.icon({
    iconUrl: "./src/assets/images/icon-location.svg",
  });

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      ref={mapRef}
      style={{ height: "75dvh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Additional map layers or components can be added here */}
      <Marker position={[lat, lng]} icon={myIcon}></Marker>
    </MapContainer>
  );
};

export default Map;
