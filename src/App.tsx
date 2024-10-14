import { useEffect, useState } from "react";
import { copyToClipboard, getPublicKey, keyGen, shortenAddress } from "./utils";
import "./index.css";
import copyIcon from "./assets/copy.png";

const App = () => {
  const [publicKey, setPublicKey] = useState<string>("");

  useEffect(() => {
    setPublicKey(() => getPublicKey() ?? "");
  }, []);

  const handleKeyGen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!publicKey) {
      const pPublicKeyGen = keyGen();
      setPublicKey(() => pPublicKeyGen.toBase58());
    }
  };

  return (
    <>
      <h1>Mutuum Web</h1>
      <p className="read-the-docs">Telegram Bot - Tx signing PoC</p>
      <button onClick={handleKeyGen}>Generate Wallet</button>
      <div
        className="copy-container"
        title="copy address to clipboard"
        onClick={() => copyToClipboard(publicKey)}
        style={{ visibility: !publicKey ? "hidden" : "visible" }}
      >
        <p>{shortenAddress(publicKey)}</p>
        <img src={copyIcon} className="copy" alt="copy" />
      </div>
    </>
  );
};

export default App;
