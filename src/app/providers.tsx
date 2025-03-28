"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";
// Your manifest sh ortould be hosted on your domain and contain your app info
// See: https://github.com/ton-connect/sdk/tree/main/packages/sdk#4-create-a-manifest
const manifestUrl =
  "https://rose-tough-bobolink-331.mypinata.cloud/ipfs/bafkreieuyhevv5lzqtk2xpqrn3r6jfe6fkdlz24cnoiyq2zb4n5urlayiy";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProvider>
      <TonConnectUIProvider
        manifestUrl={manifestUrl}
        actionsConfiguration={{
          twaReturnUrl: "https://t.me/AthenaXTonBot/AthenaX",
        }}
      >
        {children}
      </TonConnectUIProvider>
    </ThirdwebProvider>
  );
}
