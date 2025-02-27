import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { transferTicket } from "@/lib/ton";

export default function TransferModal({
  isOpen,
  onClose,
  ticket,
  onTransferComplete,
}: any) {
  const [recipient, setRecipient] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTransfer = async () => {
    if (!recipient) {
      toast({
        title: "Error",
        description: "Please enter a recipient address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Calculate maximum allowed resell price
      const maxPrice = ticket.price * (ticket.maxResellPrice / 100);

      if (parseFloat(price) > maxPrice) {
        toast({
          title: "Error",
          description: `Price exceeds maximum allowed (${maxPrice} TON)`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Call TON contract to transfer the ticket
      const result = await transferTicket(
        null, // client would be passed here
        ticket.address,
        recipient,
        parseFloat(price),
      );

      if (result.success) {
        toast({
          title: "Success",
          description: "Ticket transferred successfully",
        });
        onTransferComplete();
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to transfer ticket",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Ticket</DialogTitle>
          <DialogDescription>
            Enter the recipient's TON wallet address and selling price.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="EQ..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (TON)</Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Maximum allowed price:{" "}
              {ticket.price * (ticket.maxResellPrice / 100)} TON
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleTransfer} disabled={isLoading}>
            {isLoading ? "Processing..." : "Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
