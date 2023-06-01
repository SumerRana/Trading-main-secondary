import { createContext, useEffect, useState, useContext } from "react";
import { Web3ModalContext } from "./Web3ModalProvider";
import FaucetWrapper from "../blockchain/FaucetWrapper";
import FishInTheBlockchainLandWrapper from "../blockchain/FishInTheBlockchainLandWrapper";
import RockInTheBlockchainLandWrapper from "../blockchain/RockInTheBlockchainLandWrapper";
import TokenSwapWrapper from "../blockchain/TokenSwapWrapper";
import WoodInTheBlockchainLandWrapper from "../blockchain/WoodInTheBlockchainLandWrapper";
import WoodTokenWrapper from "../blockchain/WoodTokenWrapper";
import WoolInTheBlockchainLandWrapper from "../blockchain/WoolInTheBlockchainLandWrapper";
import tradeOfferWrapper from "../blockchain/tradeOfferWrapper"; // Import tradeOfferWrapper

interface IBlockchainContext {
  faucet: FaucetWrapper | null;
  fishInTheBlockchainLand: FishInTheBlockchainLandWrapper | null;
  rockInTheBlockchainLand: RockInTheBlockchainLandWrapper | null;
  tokenSwap: TokenSwapWrapper | null;
  woodInTheBlockchainLand: WoodInTheBlockchainLandWrapper | null;
  woodToken: WoodTokenWrapper | null;
  woolInTheBlockchainLand: WoolInTheBlockchainLandWrapper | null;
  tradeOffer: tradeOfferWrapper | null; // Add tradeOfferWrapper
}

export const BlockchainContext = createContext<IBlockchainContext>({
  faucet: null,
  fishInTheBlockchainLand: null,
  rockInTheBlockchainLand: null,
  tokenSwap: null,
  woodInTheBlockchainLand: null,
  woodToken: null,
  woolInTheBlockchainLand: null,
  tradeOffer: null, // Add tradeOfferWrapper
});

export const BlockchainProvider = ({ children }) => {
  const { web3, chainId, account } = useContext(Web3ModalContext);
  const [faucet, setFaucet] = useState<FaucetWrapper | null>(null);
  const [fishInTheBlockchainLand, setFishInTheBlockchainLand] =
    useState<FishInTheBlockchainLandWrapper | null>(null);
  const [rockInTheBlockchainLand, setRockInTheBlockchainLand] =
    useState<RockInTheBlockchainLandWrapper | null>(null);
  const [tokenSwap, setTokenSwap] = useState<TokenSwapWrapper | null>(null);
  const [woodInTheBlockchainLand, setWoodInTheBlockchainLand] =
    useState<WoodInTheBlockchainLandWrapper | null>(null);
  const [woodToken, setWoodToken] = useState<WoodTokenWrapper | null>(null);
  const [woolInTheBlockchainLand, setWoolInTheBlockchainLand] =
    useState<WoolInTheBlockchainLandWrapper | null>(null);
  const [tradeOffer, setTradeOffer] = useState<tradeOfferWrapper | null>(null); // Add tradeOfferWrapper

  useEffect(() => {
    if (web3 && chainId && account) {
      try {
        const _faucet = new FaucetWrapper(web3, chainId, account);
        const _fishInTheBlockchainLand = new FishInTheBlockchainLandWrapper(
          web3,
          chainId,
          account
        );
        const _rockInTheBlockchainLand = new RockInTheBlockchainLandWrapper(
          web3,
          chainId,
          account
        );
        const _tokenSwap = new TokenSwapWrapper(web3, chainId, account);
        const _woodInTheBlockchainLand = new WoodInTheBlockchainLandWrapper(
          web3,
          chainId,
          account
        );
        const _woodToken = new WoodTokenWrapper(web3, chainId, account);
        const _woolInTheBlockchainLand = new WoolInTheBlockchainLandWrapper(
          web3,
          chainId,
          account
        );
        const _tradeOffer = new tradeOfferWrapper(web3, chainId, account); // Initialize tradeOfferWrapper

        setFaucet(_faucet);
        setFishInTheBlockchainLand(_fishInTheBlockchainLand);
        setRockInTheBlockchainLand(_rockInTheBlockchainLand);
        setTokenSwap(_tokenSwap);
        setWoodInTheBlockchainLand(_woodInTheBlockchainLand);
        setWoodToken(_woodToken);
        setWoolInTheBlockchainLand(_woolInTheBlockchainLand);
        setTradeOffer(_tradeOffer); // Set tradeOfferWrapper
      } catch (error) {
        console.error("Failed to initialize contracts:", error);
      }
    }
  }, [web3, chainId, account]);

  return (
    <BlockchainContext.Provider
      value={{
        faucet,
        fishInTheBlockchainLand,
        rockInTheBlockchainLand,
        tokenSwap,
        woodInTheBlockchainLand,
        woodToken,
        woolInTheBlockchainLand,
        tradeOffer, // Add tradeOfferWrapper
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};