"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react";

type Event = {
  id: string;
  title: string;
  date: string;
  venue: string;
  imageUrl: string;
  ticketsAvailable: number;
};

export default function EventGrid() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setEvents([
      {
        id: "1",
        title: "TON Blockchain Conference 2025",
        date: "March 15, 2025",
        venue: "Crypto Convention Center",
        imageUrl: "/images/event1.jpg",
        ticketsAvailable: 500,
      },
      {
        id: "2",
        title: "Web3 Music Festival",
        date: "April 20, 2025",
        venue: "Decentralized Arena",
        imageUrl: "/images/event2.jpg",
        ticketsAvailable: 2000,
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-500">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="flex  md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card
          key={event.id}
          className="overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <div className="aspect-video relative overflow-hidden">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>

          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold line-clamp-2">
                {event.title}
              </h2>
              <Badge variant="secondary" className="ml-2">
                Upcoming
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pb-4">
            <div className="flex items-center text-gray-600">
              <CalendarIcon size={16} className="mr-2" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPinIcon size={16} className="mr-2" />
              <span>{event.venue}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <TicketIcon size={16} className="mr-2" />
              <span>{event.ticketsAvailable} tickets available</span>
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <Button asChild className="w-full">
              <Link href={`/events/${event.id}`}>View Event</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
