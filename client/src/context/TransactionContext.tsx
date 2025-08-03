import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { contractABI, contractAddress } from "../utils/constants";

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (
        event: string,
        callback: (...args: unknown[]) => void
      ) => void;
    };
  }
}

export const TransactionContext = createContext({ connectWallet: () => {} });

const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum!);
  const signer = await provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });
};

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please Install MetaMask!");
    const accounts = await ethereum.request({ method: "eth_accounts" });
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask to continue");

      const accounts = (await ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Error when connecting to wallet", error);
    }
  };

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  // }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet }}>
      {children}
    </TransactionContext.Provider>
  );
};
