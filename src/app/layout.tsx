import { ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
