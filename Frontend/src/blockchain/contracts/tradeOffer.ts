import Contract from "./Contract";
import Artifacts from "./tradeOffer.json";

class tradeOffer extends Contract {
    constructor(options, address) {
        super(options, "tradeOffer", Artifacts["abi"], address);
    }
}

export default tradeOffer;
