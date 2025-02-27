"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface EventCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    venue: string;
    image: string;
    description: string;
    lowestPrice: number;
    availableTickets: number;
  };
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>
          {event.date} at {event.venue}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative overflow-hidden rounded-md mb-4">
          <img
            src="/event1.jpg"
            alt={event.title}
            className="object-cover w-full h-full"
          />
          <img src="@/public/images/event2.jpg" alt="" />
        </div>
        <p className="text-sm text-gray-500 mb-2">{event.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">From {event.lowestPrice} TON</p>
            <p className="text-xs">{event.availableTickets} tickets left</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/events/${event.id}`} className="w-full">
          <Button className="w-full">View Event</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
