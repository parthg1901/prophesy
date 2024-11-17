// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract OracleReader {
    // Hardcoded oracle addresses
    address public constant CHRONICLE_ETH_USD = 0xdd6D76262Fd7BdDe428dcfCd94386EbAe0151603;
    address public constant CHRONICLE_AAVE_USD = 0x3F982a82B4B6bd09b1DAF832140F166b595FEF7F;
    address public constant CHRONICLE_ARB_USD = 0x9Bf0C1ba75C9d7b6Bf051cc7f7dCC7bfE5274302;
    address public constant CHRONICLE_AVAX_USD = 0x7F56CdaAdB1c5230Fcab3E20D3A15BDE26cb6C2b;
    address public constant CHRONICLE_BNB_USD = 0xE4A1EED38F972d05794C740Eae965A7Daa6Ab28c;
    address public constant CHRONICLE_BTC_USD = 0x6edF073c4Bd934d3916AA6dDAC4255ccB2b7c0f0;
    address public constant CHRONICLE_CRVUSD_USD = 0x3de6bEc5d5FE063fB23F36E363182AB353AbC56E;
    address public constant CHRONICLE_CRV_USD = 0xDcda58cAAC639C20aed270859109f03E9832a13A;
    address public constant CHRONICLE_DAI_USD = 0xaf900d10f197762794C41dac395C5b8112eD13E1;

    ISelfKisser public selfKisser;

    constructor(address _selfKisser) {
        selfKisser = ISelfKisser(_selfKisser);

        // Authorize this contract for accessing oracles
        selfKisser.selfKiss(CHRONICLE_ETH_USD);
        selfKisser.selfKiss(CHRONICLE_AAVE_USD);
        selfKisser.selfKiss(CHRONICLE_ARB_USD);
        selfKisser.selfKiss(CHRONICLE_AVAX_USD);
        selfKisser.selfKiss(CHRONICLE_BNB_USD);
        selfKisser.selfKiss(CHRONICLE_BTC_USD);
        selfKisser.selfKiss(CHRONICLE_CRVUSD_USD);
        selfKisser.selfKiss(CHRONICLE_CRV_USD);
        selfKisser.selfKiss(CHRONICLE_DAI_USD);
    }

    /**
     * @notice Reads the latest value and age from the specified oracle
     * @param oracleName The name of the oracle (e.g., "ETH_USD")
     * @return value The latest value from the oracle
     * @return age The timestamp of the last update from the oracle
     */
    function read(string calldata oracleName) external view returns (uint256 value, uint256 age) {
        address oracleAddress = getOracleAddress(oracleName);
        require(oracleAddress != address(0), "Oracle not found");

        IChronicle oracle = IChronicle(oracleAddress);
        (value, age) = oracle.readWithAge();
    }

    /**
     * @notice Returns the oracle address based on the oracle name
     */
    function getOracleAddress(string calldata oracleName) public pure returns (address) {
        if (keccak256(abi.encodePacked(oracleName)) == keccak256("ETH_USD")) {
            return CHRONICLE_ETH_USD;
        } else if (keccak256(abi.encodePacked(oracleName)) == keccak256("AAVE_USD")) {
            return CHRONICLE_AAVE_USD;
        } else if (keccak256(abi.encodePacked(oracleName)) == keccak256("ARB_USD")) {
            return CHRONICLE_ARB_USD;
        } else if (keccak256(abi.encodePacked(oracleName)) == keccak256("AVAX_USD")) {
            return CHRONICLE_AVAX_USD;
        } else if (keccak256(abi.encodePacked(oracleName)) == keccak256("BNB_USD")) {
            return CHRONICLE_BNB_USD;
        } else if (keccak256(abi.encodePacked(oracleName)) == keccak256("BTC_USD")) {
            return CHRONICLE_BTC_USD;
        } else if (keccak256(abi.encodePacked(oracleName)) == keccak256("CRVUSD_USD")) {
            return CHRONICLE_CRVUSD_USD;
        } else if (keccak256(abi.encodePacked(oracleName)) == keccak256("CRV_USD")) {
            return CHRONICLE_CRV_USD;
        } else if (keccak256(abi.encodePacked(oracleName)) == keccak256("DAI_USD")) {
            return CHRONICLE_DAI_USD;
        } else {
            return address(0); // Oracle not found
        }
    }
}

interface IChronicle {
    function read() external view returns (uint256 value);
    function readWithAge() external view returns (uint256 value, uint256 age);
}

interface ISelfKisser {
    function selfKiss(address oracle) external;
}
