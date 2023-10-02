import { useState } from "react";
import { ethers } from "ethers";

function App() {
  let [name, setName] = useState("");
  let [balance, setBalance] = useState();
  let [symbol, setSymbol] = useState();
  let [decimals, setDecimals] = useState();
  let [connected, setConnected] = useState(false);
  let [tokenAddress, setTokenAddress] = useState();
  let [connectedAddress, setConnectedAddress] = useState();
  let [transferAmount, setTransferAmount] = useState();

  let { ethereum } = window;
  let tokenContract = null;
  let signer = null;
  //let tokenAbi = JSON.parse('[{"inputs": [],"stateMutability": "nonpayable", "type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_from","type": "address"},{"indexed": true,"internalType": "address","name": "_to","type": "address"},{"indexed": false,"internalType": "uint256","name": "_value","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{ "internalType": "address","name": "account","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}], "stateMutability": "view","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}, {"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transfer","outputs": [],"stateMutability": "nonpayable","type": "function"}]');
  let tokenAbi = [
    "function transfer(address, uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function name() public view returns (string)",
  ];

  const transferAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

  if (ethereum) {
    let address = "0xB994b0F2579587f5E6b2ea5972D3398f04c00628";
    let provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();
    tokenContract = new ethers.Contract(address, tokenAbi, signer);
  }

  return (
    <div className="App">
      <div>
        <button
          onClick={async () => {
            if (tokenContract && !connected) {
              ethereum
                .request({ method: "eth_requestAccounts" })
                .then((accounts) => {
                  setConnected(true);
                  setConnectedAddress(accounts[0]);
                });
              setTokenAddress(await tokenContract.address);
            }
          }}
        >
          {!connected ? "Connect wallet" : "Connected"}
        </button>
        <span>Connected Address: {connectedAddress}</span>
      </div>
      <span>Connected Token Address: {tokenAddress}</span>
      <div>
        <button
          onClick={async () => {
            if (tokenContract && connected) {
              const _name = await tokenContract.name();
              setName(_name);
            }
          }}
        >
          Get Name
        </button>

        <span>Name: {name}</span>
      </div>

      <div>
        <button
          onClick={async () => {
            if (tokenContract && connected) {
              const _symbol = await tokenContract.symbol();
              setSymbol(_symbol);
            }
          }}
        >
          Get Symbol
        </button>

        <span>Symbol: {symbol}</span>
      </div>

      <div>
        <button
          onClick={async () => {
            if (tokenContract && connected) {
              const _decimals = await tokenContract.decimals();
              setDecimals(_decimals);
            }
          }}
        >
          Get Decimals
        </button>

        <span>Decimals: {decimals}</span>
      </div>

      <div>
        <button
          onClick={async () => {
            if (tokenContract && connected) {
              const _balance = await tokenContract.balanceOf(connectedAddress);
              setBalance(ethers.utils.formatEther(_balance) * 10 ** 18);
            }
          }}
        >
          Get Balance
        </button>

        <span>Balance: {balance}</span>
      </div>

      <div>
        <input
          type="text"
          placeholder="Transfer Amount"
          onChange={(e) => setTransferAmount(e.currentTarget.value)}
          value={transferAmount}
        />
        <button
          onClick={async () => {
            if (tokenContract && connected && transferAmount) {
              console.log(transferAmount)
              await tokenContract.transfer(transferAddress, transferAmount);
              const _balance = await tokenContract.balanceOf(connectedAddress);
              setBalance(ethers.utils.formatEther(_balance) * 10 ** 18);
            }
          }}
        >
          Transfer
        </button>

        <span>Balance After Transfer: {balance}</span>
      </div>
    </div>
  );
}

export default App;
