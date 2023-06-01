import Contract from "./Contract";
import Artifacts from "./FishInTheBlockchainLand.json";

class FishInTheBlockchainLand extends Contract {
    constructor(options, address) {
        super(options, "FishInTheBlockchainLand", Artifacts["abi"], address);
    }
}

export default FishInTheBlockchainLand;
