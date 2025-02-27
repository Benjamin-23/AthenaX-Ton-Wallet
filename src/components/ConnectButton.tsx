"use client";

import {
  TonConnectButton,
  useTonConnectUI,
  useTonConnectModal,
} from "@tonconnect/ui-react";

export default function ConnectButton() {
  const [tonConnectUI, setOptions] = useTonConnectUI();
  return (
    <header>
      <div className="flex justify-between w-full p-4 items-center">
        <TonConnectButton
          className="my-button-class"
          style={{ float: "right" }}
        />
        <p></p>
      </div>
    </header>
  );
}
