import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QRCode from "react-qr-code";
import { useToast } from "@/components/ui/use-toast";
import { Ticket } from "../types";

interface TicketNFTProps {
  ticket: Ticket;
  onTransfer: () => void;
}

export default function TicketNFT({
  ticket,
  onTransfer,
}: TicketNFTProps): React.ReactElement {
  const handleVerify = async (): Promise<void> => {
    // This would be used by event staff to verify the ticket
    toast({
      title: "Verifying ticket...",
      description: "Ticket is valid and hasn't been used before.",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{ticket.eventName}</CardTitle>
            <CardDescription>
              {ticket.date} at {ticket.venue}
            </CardDescription>
          </div>
          <Badge variant={ticket.used ? "secondary" : "default"}>
            {ticket.used ? "Used" : "Valid"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-4 p-2 bg-white rounded">
          <QRCode value={ticket.address} size={180} />
        </div>
        <div className="w-full text-sm space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Ticket Type:</span>
            <span>{ticket.ticketType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Seat:</span>
            <span>{ticket.seat || "General Admission"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Price:</span>
            <span>{ticket.price} TON</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Owner:</span>
            <span className="truncate max-w-[200px]">{ticket.owner}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Transfers:</span>
            <span>
              {ticket.transferCount} of {ticket.maxTransfers}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          onClick={onTransfer}
          disabled={ticket.used || ticket.transferCount >= ticket.maxTransfers}
          className="flex-1"
        >
          Transfer
        </Button>
        <Button onClick={handleVerify} variant="outline" className="flex-1">
          Verify
        </Button>
      </CardFooter>
    </Card>
  );
}
