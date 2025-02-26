"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useTonWallet } from "@tonconnect/ui-react";

const TonConnectButton = dynamic(() => import("@/components/ConnectButton"), {
  ssr: false,
});
const QrScanner = dynamic(() => import("@/components/QrScanner"), {
  ssr: false,
});

export default function ValidatePage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "validating" | "valid" | "invalid"
  >("idle");
  const wallet = useTonWallet();

  const handleScan = (result: string) => {
    setScanResult(result);
    validateTicket(result);
  };

  const validateTicket = async (ticketData: string) => {
    setValidationStatus("validating");

    // In a real implementation, this would verify the ticket on the blockchain
    // Example pseudocode:
    /*
    try {
      const ticketInfo = JSON.parse(ticketData);
      const validationResult = await contractClient.call({
        address: "EQA...", // Event contract address
        method: "validateTicket",
        params: { ticketId: ticketInfo.id }
      });

      setValidationStatus(validationResult.isValid ? 'valid' : 'invalid');
    } catch (error) {
      console.error(error);
      setValidationStatus('invalid');
    }
    */

    // Mock validation for demo
    setTimeout(() => {
      const isValid = Math.random() > 0.2; // 80% chance of success for demo
      setValidationStatus(isValid ? "valid" : "invalid");
    }, 1500);
  };

  if (!wallet) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Ticket Validation</h1>
        <p className="mb-4">
          You need to connect your organizer wallet to validate tickets
        </p>
        <div className="flex justify-center">
          <TonConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ticket Validation</h1>

      <div className="max-w-md mx-auto">
        {validationStatus === "idle" && (
          <div className="border rounded-lg overflow-hidden">
            <QrScanner
              onScan={() => {
                handleScan;
              }}
            />
            <div className="p-4 text-center">
              <p>Scan the QR code on the ticket</p>
            </div>
          </div>
        )}

        {validationStatus === "validating" && (
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Validating ticket...</p>
          </div>
        )}

        {validationStatus === "valid" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h2 className="text-xl font-bold text-green-800 mb-2">
              Valid Ticket
            </h2>
            <p className="text-green-700 mb-4">
              This ticket is valid and can be admitted.
            </p>
            <button
              onClick={() => setValidationStatus("idle")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Scan Next Ticket
            </button>
          </div>
        )}

        {validationStatus === "invalid" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">✗</span>
            </div>
            <h2 className="text-xl font-bold text-red-800 mb-2">
              Invalid Ticket
            </h2>
            <p className="text-red-700 mb-4">
              This ticket is not valid or has already been used.
            </p>
            <button
              onClick={() => setValidationStatus("idle")}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
