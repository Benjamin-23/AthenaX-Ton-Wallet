"use client";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";

type Wallet = {
  address: string;
  balance: string;
};

export default function WalletConnect() {
  const wallet: Wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  return (
    <div>
      <TonConnectButton />
      {wallet && (
        <div className="mt-2 text-sm">
          Balance:{" "}
          {wallet.balance
            ? (Number(wallet.balance) / 1000000000).toFixed(2)
            : "0"}{" "}
          TON
        </div>
      )}
    </div>
  );
}
