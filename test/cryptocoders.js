const CryptoCoders = artifacts.require("./CryptoCoders.sol");

contract("CryptoCoders", accounts => {
  let contract;

  before(async () => {
    contract = await CryptoCoders.deployed();

  })


  it("...should get deployed", async () => {
    assert.notEqual(contract, "");
    
  });

  //Testing mint function to make sure a coder was added to the coders array
  it(".. get' minted", async () => {
    const result = await contract.mint("Sachin")
    let coder = await contract.coders(0);
    assert(coder, "Sachin");
  })
});
