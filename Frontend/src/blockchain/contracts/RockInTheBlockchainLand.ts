import Contract from "./Contract";
import Artifacts from "./RockInTheBlockchainLand.json";

class RockInTheBlockchainLand extends Contract {
    constructor(options, address) {
        super(options, "RockInTheBlockchainLand", Artifacts["abi"], address);
    }
}

export default RockInTheBlockchainLand;
