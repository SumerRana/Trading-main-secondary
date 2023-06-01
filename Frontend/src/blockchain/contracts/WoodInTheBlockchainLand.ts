import Contract from "./Contract";
import Artifacts from "./WoodInTheBlockchainLand.json";

class WoodInTheBlockchainLand extends Contract {
    constructor(options, address) {
        super(options, "WoodInTheBlockchainLand", Artifacts["abi"], address);
    }
}

export default WoodInTheBlockchainLand;
