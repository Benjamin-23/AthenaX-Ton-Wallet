"use client";
import ConnectButton from "@/components/ConnectButton";
import EventGrid from "@/components/EventGrid";
import TicketPurchase from "@/components/TicketPurchase";
import WalletConnect from "@/components/WalletConnect";
import { useTonAddress, useTonConnectModal } from "@tonconnect/ui-react";
import dynamic from "next/dynamic";
import { Dir } from "node:fs";
import react from "react";

export default function Home() {
  const [connected, setConnected] = react.useState(false);
  const [walletAddress, setWalletAddress] = react.useState("");
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [balance, setBalance] = react.useState(0);

  react.useEffect(() => {
    const getBalance = async () => {
      if (rawAddress) {
        try {
          const response = await fetch(
            `https://testnet.toncenter.com/api/v2/getAddressBalance?address=${rawAddress}`,
          );
          const data = await response.json();
          setBalance(data.result / 1000000000);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    getBalance();
  }, [rawAddress]);

  return (
    <main className="container mx-auto px-4 py-8">
      <ConnectButton />
      {userFriendlyAddress && (
        <div>
          <WalletConnect />
          <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
          <EventGrid />
          <TicketPurchase eventId="1" ticketTypes={[]} />
        </div>
      )}
    </main>
  );
}
