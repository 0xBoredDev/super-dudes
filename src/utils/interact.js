const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const whitelist = require("./whitelist.json");

const API_URL =
  "https://eth-mainnet.alchemyapi.io/v2/qmuA1_caZxbrsZi3TO5TH2isPwtjxon2"; //alchemyapi
const web3 = createAlchemyWeb3(API_URL);

const contractABI = require("./abi.json");
const contractAddress = "0xeE685197220D03782E3a58fc2Db83d8831216a39"; //smart contract address
const nftContract = new web3.eth.Contract(contractABI, contractAddress);

// Calculate merkle root from the whitelist array
const leafNodes = whitelist.map((addr) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const root = merkleTree.getRoot();

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const obj = {
        status: "",
        address: addressArray[0],
      };

      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😞" + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              style={{ color: "white" }}
              rel="noreferrer"
              href="https://metamask.io/download.html"
            >
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "",
        };
      } else {
        return {
          address: "",
          status: "",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😞" + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              style={{ color: "white" }}
              rel="noreferrer"
              href="https://metamask.io/download.html"
            >
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

//contract function

export const getTotalSupply = async () => {
  const result = await nftContract.methods.totalSupply().call();
  return result;
};

export const getMaxSupply = async () => {
  const result = await nftContract.methods.maxSupply().call();
  return result;
};

const getNoPaidNFT = async () => {
  const result = await nftContract.methods.noPaidNfts().call();
  return result;
};

export const getPaused = async () => {
  const result = await nftContract.methods.paused().call();
  return result;
};

export const getWhitelistMintEnabled = async () => {
  const result = await nftContract.methods.whitelistMintEnabled().call();
  return result;
};

export const getMaxMintAmountPerTx = async () => {
  const result = await nftContract.methods.maxMintAmountPerTx().call();
  return result;
};

const getNftPrice = async () => {
  const result = await nftContract.methods.cost().call();
  const resultEther = web3.utils.fromWei(result, "ether");
  return resultEther;
};

const checkIfValidWl = async (address) => {
  const leaf = keccak256(address);
  const proof = merkleTree.getHexProof(leaf);

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root);

  console.log(
    "valid for whitelist - inside function checkIfValidWl",
    isValid,
    proof
  );

  return { isValid, proof };
};

let response = {
  success: false,
  status: "",
};

export const mintWhitelist = async (amount, account) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: (
        <p>
          🦊 Connect to Metamask using{" "}
          <span className="px-2 text-purple-600">Connect Wallet</span> button.
        </p>
      ),
    };
  }

  const { isValid, proof } = await checkIfValidWl(account);
  const costEther = await getNftPrice();
  const costWEI = web3.utils.toWei(costEther, "ether");

  if (!isValid) {
    return {
      success: false,
      status: "Invalid Merkle Proof - You are not on the whitelist",
    };
  }

  await nftContract.methods
    .whitelistMint(amount, proof)
    .send({
      from: account,
      to: contractAddress,
      value: String(costWEI * amount),
    })
    .then(function (receipt) {
      console.log("receipt: ", receipt);
      response.success = true;
      response.status = "✅ Successfully Minted " + amount + " Super Dudes";
    })
    .catch(function (error) {
      console.log("error: ", error);
      response.success = false;
      response.status = "😥" + error.message;
    });

  return response;
};

export const mint = async (amount, account) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: (
        <p>
          🦊 Connect to Metamask using{" "}
          <span className="px-2 text-purple-600">Connect Wallet</span> button.
        </p>
      ),
    };
  }

  const costEther = await getNftPrice();
  const costWEI = web3.utils.toWei(costEther, "ether");

  await nftContract.methods
    .mint(amount)
    .send({
      from: account,
      to: contractAddress,
      value: String(costWEI * amount),
    })
    .then(function (receipt) {
      console.log("receipt: ", receipt);
      response.success = true;
      response.status = "✅ Successfully Minted " + amount + " Super Dudes";
    })
    .catch(function (error) {
      console.log("error: ", error);
      response.success = false;
      response.status = "😥" + error.message;
    });

  return response;
};

export const mintParent = async (amount, account) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: (
        <p>
          🦊 Connect to Metamask using{" "}
          <span className="px-2 text-purple-600">Connect Wallet</span> button.
        </p>
      ),
    };
  }

  await nftContract.methods
    .claimFromParentNFT(amount)
    .send({
      from: account,
      to: contractAddress,
    })
    .then(function (receipt) {
      console.log("receipt: ", receipt);
      response.success = true;
      response.status = "✅ Successfully Minted " + amount + " Super Dudes";
    })
    .catch(function (error) {
      console.log("error: ", error);
      response.success = false;
      response.status = "😥" + error.message;
    });

  return response;
};

export { getNoPaidNFT, checkIfValidWl, getNftPrice };
