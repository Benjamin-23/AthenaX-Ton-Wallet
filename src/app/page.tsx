"use client";
import ConnectButton from "@/components/ConnectButton";
import MapView from "@/components/MapView";
import WalletConnect from "@/components/WalletConnect";
import WalletDetails from "@/components/WalletDetails";
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

  const DynamicMap = dynamic(() => import("@/components/MapView"), {
    ssr: false,
    loading: () => (
      <div style={{ height: "500px", width: "100%" }}>Loading map...</div>
    ),
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-3xl font-bold">TON Connect Example</h1>
      <ConnectButton />
      {userFriendlyAddress && (
        <div className="flex gap-4 flex-col">
          {/* <WalletDetails /> */}
          <WalletConnect />
          {/* <MapView /> */}
        </div>
      )}
    </main>
  );
}
