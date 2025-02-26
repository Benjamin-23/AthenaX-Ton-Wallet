"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import ClientOnly from "./ClientOnly";

type Business = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  address: string;
};

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function MapView() {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setBusinesses([
      {
        id: "1",
        name: "TON Coffee Shop",
        lat: 40.7128,
        lng: -74.006,
        category: "Cafe",
        address: "123 TON Street",
      },
      {
        id: "2",
        name: "Crypto Clothing",
        lat: 40.7138,
        lng: -74.005,
        category: "Retail",
        address: "456 Blockchain Ave",
      },
    ]);
  }, []);
}
