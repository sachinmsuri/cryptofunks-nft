import React, { useEffect, useState } from "react";
import CryptoCoders from "./contracts/CryptoCoders.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

const App = () => {

  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [coders, setCoders] = useState([]);
  const [mintText, setMintText] = useState("");


  //Load WEB3 account from metamask --> make sure login with metamask
  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
      setAccount(accounts[0]);
    }

  }

  //Load contract
  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = CryptoCoders.networks[networkId];
    if (networkData) {
      const abi = CryptoCoders.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  }

  //Load NFT's --> get coders within coders array and display 
  const loadNFTS = async (contract) => {
    
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(totalSupply);

    let nfts = [];

    for(let i=0; i<totalSupply; i++) {
      //calling the coders array from the contract
      let coder = await contract.methods.coders(i).call();
      nfts.push(coder);
    }
    setCoders(nfts);
  }

  const mint = () => {
    contract.methods.mint(mintText).send({ from: account }, (error) => {console.log("worked");

      if(!error){
        setCoders([...coders, mintText]);
        setMintText("");
      }
      
    })

  }
  
  useEffect(async () =>{
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    let contract = await loadWeb3Contract(web3);
    await loadNFTS(contract);
  },
  []
  )




  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
        <a className="navbar-brand" href="#">CryptoFunks</a>
      </div>
    </nav>
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col d-flex flex-column align-items-center">
          <img className="mb-4" src="https://avatars.dicebear.com/api/pixel-art/sachin.svg" width="72"/>
          <h1 className="display-5 fw-bold">CryptoFunks</h1>
          <div className="col-6 text-center">
            <p className="lead text-center">Create and mint your own personal NFT based of your name, once your name has been minted it cannot be used again</p>
            <input 
              type="text"
              placeholder="e.g Sachin"
              value={mintText}
              onChange={(e)=>setMintText(e.target.value)}
              className = "form-control mb-2" />
              <button onClick={mint} className="btn btn-primary">Mint</button>
          </div>
          <div className="col-8 d-flex justify-content-center flex-wrap">
          {coders.map((coder, key) => 
            <div key = {key} className="d-flex flex-column align-items-center">
              <img width="150" src={`https://avatars.dicebear.com/api/pixel-art/${coder}.svg`} />
              <span>{coder}</span>
            </div>
          )}
        </div>
        </div>

      </div>
    </div>

    </div>
  )
}

export default App;

