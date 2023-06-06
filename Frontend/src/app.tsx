import React, { useState, useCallback, useEffect } from "react";
import "./app.css";
import { Web3ModalContext } from "./contexts/Web3ModalProvider";
import { BlockchainContext } from "./contexts/BlockchainProvider";

type TradeOffer = {
  offerId: number;
  offerCreator: string;
  offerAmount1: number;
  offerAmount2: number;
  offerAmount3: number;
  offerAmount4: number;
  offerAmount5: number;
  wantedAmount1: number;
  wantedAmount2: number;
  wantedAmount3: number;
  wantedAmount4: number;
  wantedAmount5: number;
  offerTimestamp: number;
  offerStatus: boolean;
};

interface Offer {
  id: number;
  tokensOffered: { id: number; token: string; amount: number }[];
  tokensWanted: { id: number; token: string; amount: number }[];
  status: string;
  creator: string | null;
  date: string; // Date field
  time: string; // Time field
}

const tokenAmounts = {};

const App: React.FC = () => {
  // Accessing the Web3ModalContext
  const { web3, account, connect, disconnect, signer, chainId } = React.useContext(
    Web3ModalContext
  );

  //allowance status
  const [clayAllowance, setClayAllowance] = useState("");
  const [fishAllowance, setFishAllowance] = useState("");
  const [rockAllowance, setRockAllowance] = useState("");
  const [woodAllowance, setWoodAllowance] = useState("");
  const [woolAllowance, setWoolAllowance] = useState("");

  // State for tokens offered and tokens wanted
  const [tokensOffered, setTokensOffered] = useState([
    { id: 1, token: "", amount: 0 }
  ]);
  const [tokensWanted, setTokensWanted] = useState([
    { id: 1, token: "", amount: 0 }
  ]);


  // add the blockchain context 
  const {
    woodInTheBlockchainLand: WoodInTheBlockchainLandWrapper,
    rockInTheBlockchainLand: RockInTheBlockchainLandWrapper,
    clayInTheBlockchainLand: ClayInTheBlockchainLandWrapper,
    woolInTheBlockchainLand: WoolInTheBlockchainLandWrapper,
    fishInTheBlockchainLand: FishInTheBlockchainLandWrapper,
    tradeOffer: tradeOfferWrapper

  } = React.useContext(BlockchainContext);

  // State for open offers
  const [openOffers, setOpenOffers] = useState<Offer[]>([]);

  const getWoodAllowance = async () => {
    if (web3 && account && chainId && tokenAmounts[0] > 0) {
      const _woodAllowance = await WoodInTheBlockchainLandWrapper?.allowance();
      setWoodAllowance(String(Number(_woodAllowance) / 10 ** 18) || "0");
    }
  }
  const getRockAllowance = async () => {
    if (web3 && account && chainId && tokenAmounts[1] > 0) {
      const _rockAllowance = await RockInTheBlockchainLandWrapper?.allowance();
      setRockAllowance(String(Number(_rockAllowance) / 10 ** 18) || "0");
    }
  }
  const getClayAllowance = async () => {
    if (web3 && account && chainId && tokenAmounts[2] > 0) {
      const _clayAllowance = await ClayInTheBlockchainLandWrapper?.allowance();
      setClayAllowance(String(Number(_clayAllowance) / 10 ** 18) || "0");
    }
  }
  const getWoolAllowance = async () => {
    if (web3 && account && chainId && tokenAmounts[3] > 0) {
      const _woolAllowance = await WoolInTheBlockchainLandWrapper?.allowance();
      setWoolAllowance(String(Number(_woolAllowance) / 10 ** 18) || "0");
    }
  }
  const getFishAllowance = async () => {
    if (web3 && account && chainId && tokenAmounts[4] > 0) {
      const _fishAllowance = await FishInTheBlockchainLandWrapper?.allowance();
      setFishAllowance(String(Number(_fishAllowance) / 10 ** 18) || "0");
    }
  }
  

  useEffect(() => {
    getWoodAllowance();
    getRockAllowance();
    getClayAllowance();
    getWoolAllowance();
    getFishAllowance();
  });

  // Function to add a new token to the tokensOffered state
  const handleAddTokenOffered = () => {
    const newToken = { id: tokensOffered.length + 1, token: "", amount: 0 };
    setTokensOffered([...tokensOffered, newToken]);
  };

  // Function to add a new token to the tokensWanted state
  const handleAddTokenWanted = () => {
    const newToken = { id: tokensWanted.length + 1, token: "", amount: 0 };
    setTokensWanted([...tokensWanted, newToken]);
  };

  // Function to handle changes in the tokensOffered state
  const handleTokenOfferedChange = (
    id: number,
    field: string,
    value: string
  ) => {
    const updatedTokens = tokensOffered.map((token) =>
      token.id === id ? { ...token, [field]: value } : token
    );
    setTokensOffered(updatedTokens);
  };

  // Function to handle changes in the tokensWanted state
  const handleTokenWantedChange = (
    id: number,
    field: string,
    value: string
  ) => {
    const updatedTokens = tokensWanted.map((token) =>
      token.id === id ? { ...token, [field]: value } : token
    );
    setTokensWanted(updatedTokens);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate the form inputs before submitting
    if (tokensOffered.some((token) => token.token === "" || token.amount === 0)) {
      alert("Please fill in all the token offered fields.");
      return;
    }
    if (tokensWanted.some((token) => token.token === "" || token.amount === 0)) {
      alert("Please fill in all the token wanted fields.");
      return;
    }

    // Create an array to store the ordered tokens
    const tokensOfferedData = Array(5).fill(null);

    for (let i = 0; i < tokensOffered.length; i++) {
      if (tokensOffered[i].token === "WOOD") {
        tokensOfferedData[0] = tokensOffered[i];
      } else if (tokensOffered[i].token === "ROCK") {
        tokensOfferedData[1] = tokensOffered[i];
      } else if (tokensOffered[i].token === "CLAY") {
        tokensOfferedData[2] = tokensOffered[i];
      } else if (tokensOffered[i].token === "WOOL") {
        tokensOfferedData[3] = tokensOffered[i];
      } else if (tokensOffered[i].token === "FISH") {
        tokensOfferedData[4] = tokensOffered[i];
      }
    }

    // Set amount to 0 for empty tokens in tokensOfferedData
    for (let i = 0; i < tokensOfferedData.length; i++) {
      if (tokensOfferedData[i] === null) {
        tokensOfferedData[i] = { id: i + 1, token: "", amount: 0 };
      }
    }

    // Create an array to store the wanted tokens
    const tokensWantedData = Array(5).fill(null);

    for (let i = 0; i < tokensWanted.length; i++) {
      if (tokensWanted[i].token === "WOOD") {
        tokensWantedData[0] = tokensWanted[i];
      } else if (tokensWanted[i].token === "ROCK") {
        tokensWantedData[1] = tokensWanted[i];
      } else if (tokensWanted[i].token === "CLAY") {
        tokensWantedData[2] = tokensWanted[i];
      } else if (tokensWanted[i].token === "WOOL") {
        tokensWantedData[3] = tokensWanted[i];
      } else if (tokensWanted[i].token === "FISH") {
        tokensWantedData[4] = tokensWanted[i];
      }
    }

    // Set amount to 0 for empty tokens in tokensWantedData
    for (let i = 0; i < tokensWantedData.length; i++) {
      if (tokensWantedData[i] === null) {
        tokensWantedData[i] = { id: i + 1, token: "", amount: 0 };
      }
    }

    const tokenAmounts: number[] = [];

    for (let i = 0; i < tokensOfferedData.length; i++) {
      const { amount } = tokensOfferedData[i];
      tokenAmounts.push(amount);
    }

    for (let i = 0; i < tokensWantedData.length; i++) {
      const { amount } = tokensWantedData[i];
      tokenAmounts.push(amount);
    }

    const tokenAmountsTuple = tokenAmounts as [number, number, number, number, number, number, number, number, number, number];

    if (web3 && account && chainId) {
      tradeOfferWrapper
        ?.makeOffer(...tokenAmountsTuple)
        .then(() => {
          alert("Offer created successfully!");
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }

    // Prepare the data to be submitted
    const newOffer: Offer = {
      id: openOffers.length + 1,
      tokensOffered,
      tokensWanted,
      status: "Open",
      creator: account,
      date: new Date().toISOString().split("T")[0], // Get the current date
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) // Get the current time
    };

    // Update the open offers state
    setOpenOffers([...openOffers, newOffer]);




    // Reset the form after submission
    setTokensOffered([{ id: 1, token: "", amount: 0 }]);
    setTokensWanted([{ id: 1, token: "", amount: 0 }]);
  };

  // Function to connect to XDCPay
  const handleConnectXDCPay = useCallback(() => {
    connect();
  }, [connect]);

  // Function to disconnect from the wallet
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const handleApprove = () => {
    if (web3 && account && chainId) {

      if (tokenAmounts[0] > 0) {
        WoodInTheBlockchainLandWrapper
          ?.approve()
          .then(() => {
            alert(" Wood Approved!");
          })
      }

      if (tokenAmounts[1] > 0) {
        RockInTheBlockchainLandWrapper
          ?.approve()
          .then(() => {
            alert(" Rock Approved!");
          })
      }

      if (tokenAmounts[2] > 0) {
        ClayInTheBlockchainLandWrapper
          ?.approve()
          .then(() => {
            alert(" Clay Approved!");
          })
      }

      if (tokenAmounts[3] > 0) {
        WoolInTheBlockchainLandWrapper
          ?.approve()
          .then(() => {
            alert(" Wool Approved!");
          })
      }


      if (tokenAmounts[4] > 0) {
        FishInTheBlockchainLandWrapper
          ?.approve()
          .then(() => {
            alert(" Fish Approved!");
          })
      }
      window.location.reload();

    }
  };

  // Function to initiate the trade
  const initiateTrade = useCallback(
    async (offerId: number) => {
      try {
        // Perform the necessary steps to initiate the trade
        console.log("Initiating trade for offer ID:", offerId);

        // Update the offer status to "In Progress" or any other desired value
        const updatedOffers = openOffers.map((offer) =>
          offer.id === offerId ? { ...offer, status: "In Progress" } : offer
        );
        setOpenOffers(updatedOffers);

        // Optional: Interact with a contract or perform additional logic
        // Declare and define the tradeOffer variable
        // const tradeOffer: TradeOffer | undefined = undefined; 
        // if (tradeOffer) {
        //   // Perform the tradeOffer action here
        //   await tradeOffer.performTrade(offerId);
        // }

        // Sign the transaction
        const signature = await signer.sign("Hello, World!");

        // Perform any necessary UI updates or display a success message to the user
        console.log("Trade initiated successfully");
      } catch (error) {
        // Handle errors
        console.error("Error initiating trade:", error);
        // Display an error message to the user
      }
    },
    [openOffers, signer]
  );

  return (
    <main className="main">
      <div className="button-container">
        {!account ? (
          <button onClick={handleConnectXDCPay}>Connect XDCPay</button>
        ) : (
          <button onClick={handleDisconnectWallet}>Disconnect</button>
        )}
      </div>

      {/* Tokens Offered */}
      {tokensOffered.map((token) => (
        <div key={token.id} className="token-wrapper">
          <h3>Amount</h3>
          <input
            type="number"
            value={token.amount}
            onChange={(e) =>
              handleTokenOfferedChange(token.id, "amount", e.target.value)
            }
          />
          <h3>Tokens Offered</h3>
          <select
            value={token.token}
            onChange={(e) =>
              handleTokenOfferedChange(token.id, "token", e.target.value)
            }
          >
            <option value="">Select Token</option>
            <option value="WOOD">WOOD</option>
            <option value="ROCK">ROCK</option>
            <option value="CLAY">CLAY</option>
            <option value="WOOL">WOOL</option>
            <option value="FISH">FISH</option>
          </select>
        </div>
      ))}

      <button onClick={handleAddTokenOffered}>Add Another</button>

      {/* Tokens Wanted */}
      {tokensWanted.map((token) => (
        <div key={token.id} className="token-wrapper">
          <h3>Amount</h3>
          <input
            type="number"
            value={token.amount}
            onChange={(e) =>
              handleTokenWantedChange(token.id, "amount", e.target.value)
            }
          />
          <h3>Tokens Wanted</h3>
          <select
            value={token.token}
            onChange={(e) =>
              handleTokenWantedChange(token.id, "token", e.target.value)
            }
          >
            <option value="">Select Token</option>
            <option value="WOOD">WOOD</option>
            <option value="ROCK">ROCK</option>
            <option value="CLAY">CLAY</option>
            <option value="WOOL">WOOL</option>
            <option value="FISH">FISH</option>
          </select>
        </div>
      ))}

      <button onClick={handleAddTokenWanted}>Add Another</button>

      {/* Create Offer button */}
      {/* <button id="create-offer" onClick={handleSubmit}>
        CREATE OFFER TO TRADE
      </button> */}

      {(clayAllowance === "0" &&
      fishAllowance === "0" &&
      rockAllowance === "0" &&
      woodAllowance === "0" &&
      woolAllowance === "0" )? (
        <button id="create-offer" onClick={handleApprove}>
          APPROVE TOKEN TRANSFER
        </button>
      ) : (
        <button id="create-offer" onClick={handleSubmit}>
          CREATE OFFER TO TRADE
        </button>
      )}




      {/* Open Offers */}
      <div className="open-offers">
        <h2>Marketplace Offers (List of Open Offers)</h2>
        {openOffers.length > 0 ? (
          <ul>
            {openOffers.map((offer) => (
              <li key={offer.id}>
                <strong>Offer #{offer.id}</strong>
                <p>
                  Tokens Offered: {offer.tokensOffered
                    .map((token) => `${token.amount} ${token.token}`)
                    .join(", ")}
                </p>
                <p>
                  Tokens Wanted: {offer.tokensWanted
                    .map((token) => `${token.amount} ${token.token}`)
                    .join(", ")}
                </p>
                <p>Status: {offer.status}</p>
                <p>Creator: {offer.creator}</p>
                <p>Date: {offer.date}</p>
                <p>Time: {offer.time}</p>
                <button onClick={() => initiateTrade(offer.id)}>TRADE</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No open offers available.</p>
        )}
      </div>
    </main>
  );
};

export default App;
