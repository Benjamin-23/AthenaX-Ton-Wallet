"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";

const TonConnectButton = dynamic(() => import("./ConnectButton"), {
  ssr: false,
});

type TicketType = {
  id: string;
  name: string;
  price: string;
  available: number;
};

type TicketPurchaseProps = {
  eventId: string;
  ticketTypes: TicketType[];
};

export default function TicketPurchase({
  eventId,
  ticketTypes,
}: TicketPurchaseProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const selectedTicket = ticketTypes.find((t) => t.id === selectedType);

  const handlePurchase = async () => {
    if (!wallet || !selectedTicket) return;

    try {
      // In real implementation, this would call a contract method
      // to purchase tickets using the connected wallet

      // Example transaction logic
      /*
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutes
        messages: [
          {
            address: "EQA...", // Contract address
            amount: (Number(selectedTicket.price) * quantity).toString(),
            payload: "...", // Encoded contract call
          }
        ]
      });
      */

      alert("Purchase completed! Check your wallet for NFT tickets.");
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    }
  };

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Purchase Tickets</h2>

      {!wallet && (
        <div className="mb-4">
          <p className="mb-2">Connect your wallet to purchase tickets</p>
          <TonConnectButton />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Ticket Type</label>
        <div className="space-y-2">
          {ticketTypes.map((type) => (
            <div
              key={type.id}
              className={`border p-3 rounded cursor-pointer ${selectedType === type.id ? "border-blue-500 bg-blue-50" : ""}`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex justify-between">
                <span className="font-medium">{type.name}</span>
                <span>{type.price} TON</span>
              </div>
              <div className="text-sm text-gray-600">
                {type.available} available
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded p-2 w-full"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between font-medium">
          <span>Total:</span>
          <span>
            {selectedTicket
              ? (Number(selectedTicket.price) * quantity).toFixed(2) + " TON"
              : "0 TON"}
          </span>
        </div>
      </div>

      <button
        onClick={handlePurchase}
        disabled={!wallet || !selectedType}
        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium disabled:bg-gray-300"
      >
        {wallet ? "Purchase Now" : "Connect Wallet to Purchase"}
      </button>
    </div>
  );
}
