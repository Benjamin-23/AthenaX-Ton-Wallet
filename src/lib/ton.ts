import { TonClient } from "@tonclient/core";
import { libWeb } from "@tonclient/lib-web";
import {
  AntiScalpingParams,
  MintResult,
  TransferResult,
  VerifyResult,
} from "../types";

// Initialize TON client
export const initTonClient = async (): Promise<TonClient> => {
  // @ts-ignore
  TonClient.useBinaryLibrary(libWeb);
  return new TonClient({
    network: {
      server_address: "https://main.ton.dev",
    },
  });
};

// Connect to wallet
export const connectWallet = async (): Promise<string> => {
  if (
    !(window as any).tonProtocolVersion ||
    (window as any).tonProtocolVersion < 1
  ) {
    throw new Error("Please install TON wallet extension");
  }

  try {
    const provider = (window as any).ton;
    const accounts = await provider.send("ton_requestAccounts");
    return accounts[0];
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    throw error;
  }
};
