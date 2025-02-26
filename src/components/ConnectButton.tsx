"use client";

import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";

export default function ConnectButton() {
  const [tonConnectUI, setOptions] = useTonConnectUI();
  return (
    <header>
      <div className="flex justify-between w-full bg-black p-4 items-center">
        <span>My App with React UI</span>
        <TonConnectButton
          className="my-button-class"
          style={{ float: "right" }}
        />
        <p></p>
      </div>
    </header>
  );
}
