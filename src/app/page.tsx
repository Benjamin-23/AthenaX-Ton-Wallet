"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "@/components/EventCard";
import { connectWallet } from "@/lib/ton";
import { Event } from "@/types";
import { toast } from "sonner";
import { useTonWallet } from "@tonconnect/ui-react";
import ConnectButton from "@/components/ConnectButton";

export default function HomePage(): React.ReactElement {
  const [events, setEvents] = useState<Event[]>([]);
  const wallet = useTonWallet();

  // Mock events data
  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "Summer Music Festival",
        date: "June 15, 2023",
        venue: "Central Park",
        description:
          "A three-day music festival featuring top artists from around the world.",
        image: "public/images/event1.jpg",
        lowestPrice: 50,
        availableTickets: 1500,
      },
      {
        id: "2",
        title: "Tech Conference 2023",
        date: "September 22-24, 2023",
        venue: "Convention Center",
        description:
          "The biggest tech conference of the year with keynotes, workshops, and networking.",
        image: "/images/event2.jpg",
        lowestPrice: 150,
        availableTickets: 800,
      },
      {
        id: "3",
        title: "Comedy Night",
        date: "July 8, 2023",
        venue: "Laugh Factory",
        description:
          "A night of laughter with the best stand-up comedians in town.",
        image: "/api/placeholder/800/400",
        lowestPrice: 25,
        availableTickets: 200,
      },
    ]);
  }, []);

  const handleConnect = async (): Promise<void> => {
    try {
      await connectWallet();
      toast("wallet connected");
    } catch (error) {
      const err = error as Error;
      toast(err.message);
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">NFT Event Tickets</h1>
        <ConnectButton />
      </div>

      <div className="mb-8 container">
        <div className="relative">
          <Input
            className="w-full py-6 pl-10"
            placeholder="Search for events, venues, or artists..."
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
