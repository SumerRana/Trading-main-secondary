import Contract from "./Contract";
import Artifacts from "./TokenSwap.json";

class TokenSwap extends Contract {
    constructor(options, address) {
        super(options, "TokenSwap", Artifacts["abi"], address);
    }
}

export default TokenSwap;
