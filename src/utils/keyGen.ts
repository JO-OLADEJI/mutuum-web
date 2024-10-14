import { Client } from "mina-signer";
import { PrivateKey, PublicKey } from "o1js";

const STORAGE_KEY = "MINA-WALLET";

export const keyGen = (): PublicKey => {
  const storedPrivateKey = localStorage.getItem(STORAGE_KEY);

  if (!storedPrivateKey) {
    const client = new Client({ network: "mainnet" });
    const keypair = client.genKeys();
    localStorage.setItem(STORAGE_KEY, keypair.privateKey);
    return PublicKey.fromBase58(keypair.publicKey);
  }

  return PrivateKey.fromBase58(storedPrivateKey).toPublicKey();
};

export const getPublicKey = () => localStorage.getItem(STORAGE_KEY);
