var CryptoCoders = artifacts.require("./CryptoCoders.sol");

module.exports = function(deployer) {
  deployer.deploy(CryptoCoders);
};