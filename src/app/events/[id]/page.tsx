"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { connectWallet } from "@/lib/ton";
import { Event, TicketType } from "@/types";
import { toast } from "sonner";
import { useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";

export default function EventPage(): React.ReactElement {
  const router = useRouter();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const [event, setEvent] = useState<Event | null>(null);
  const wallet: any = useTonWallet();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Mock event data - would be fetched from API
  useEffect(() => {
    if (id) {
      setEvent({
        id: id as string,
        title: "Summer Music Festival",
        date: "June 15, 2023",
        venue: "Central Park",
        description:
          "A three-day music festival featuring top artists from around the world. Join us for an unforgettable experience with live performances, food vendors, and activities for all ages.",
        image: "/api/placeholder/1200/600",
        lowestPrice: "50",
        availableTickets: 1250,
        ticketTypes: [
          {
            id: "general",
            name: "General Admission",
            price: 50,
            available: 1000,
            description: "Access to all main stages and general areas.",
          },
          {
            id: "vip",
            name: "VIP Access",
            price: 150,
            available: 200,
            description:
              "Premium viewing areas, exclusive lounge, complimentary drinks.",
          },
          {
            id: "backstage",
            name: "Backstage Pass",
            price: 300,
            available: 50,
            description:
              "All VIP benefits plus backstage access and artist meet & greets.",
          },
        ],
      });
    }
  }, [id]);

  const handleConnect = async (): Promise<void> => {
    try {
      // Use the address value or remove declaration
      await connectWallet();
    } catch (error: any) {
      const err = error as Error;
      toast(err.message);
    }
  };

  const handlePurchase = async (ticket: TicketType): Promise<void> => {
    if (!wallet) {
      toast("Please connect your wallet first");
      return;
    }

    if (!event) {
      toast("event data not available");
      return;
    }

    setIsLoading(true);

    try {
      // Mint the NFT ticket on TON blockchain
      // const result = await mintTicket(
      //   null, // TON client would be passed here
      //   event.id,
      //   ticket.id,
      //   ticket.price,
      //   wallet,
      //   {
      //     maxTransfers: 2,
      //     minimumHoldTime: 86400, // 24 hours
      //     maxResellPrice: 150, // 150% of original price
      //   },
      // );

      toast("ticket purchased successfully");

      // Redirect to my tickets page
      router.push("/my-tickets");
    } catch (error) {
      const err = error as Error;
      toast(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (event) {
    return (
      <div className="py-8 container flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
          <img
            src={event?.image}
            alt={event?.title}
            className="object-cover w-full h-full"
          />
        </div>

        <h1 className="text-4xl font-bold mb-2">{event?.title}</h1>
        <div className="flex gap-4 text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{event?.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{event?.venue}</span>
          </div>
        </div>

        <p className="text-lg mb-6">{event?.description}</p>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Tickets</h2>
          {!wallet && (
            <Button onClick={handleConnect}>Connect Wallet to Purchase</Button>
          )}
        </div>

        <div className="space-y-4">
          {event?.ticketTypes &&
            event.ticketTypes.map((ticket: any) => (
              <Card key={ticket.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="p-6 flex-grow">
                      <h3 className="text-xl font-bold mb-1">{ticket.name}</h3>
                      <p className="text-gray-500 mb-2">{ticket.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold">
                          {ticket.price} TON
                        </span>
                        <span className="text-sm text-gray-500">
                          {ticket.available} available
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 flex justify-center md:justify-end">
                      <Button
                        onClick={() => handlePurchase(ticket)}
                        disabled={!wallet || isLoading}
                      >
                        {isLoading ? "Processing..." : "Purchase Ticket"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
