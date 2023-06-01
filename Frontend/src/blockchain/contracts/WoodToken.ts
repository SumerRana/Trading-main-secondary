import Contract from "./Contract";
import Artifacts from "./WoodToken.json";

class WoodToken extends Contract {
    constructor(options, address) {
        super(options, "WoodToken", Artifacts["abi"], address);
    }
}

export default WoodToken;
