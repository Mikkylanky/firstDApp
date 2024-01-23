// Ethereum contract address (hexadecimal with "0x" prefix)
const MoodContractAddress = "0xc78d04affffbb80e45f44cedafe5c1a86dfdd6df";
// Ethereum contract ABI (Interface of the contract)
const MoodContractABI = [
  // Set mood
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // Get mood
  {
    inputs: [],
    name: "getMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Ethers contract and signer initialization
let MoodContract = undefined;
let signer = undefined;

// Web3Provider initialization using Ethers
const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

// Request Ethereum accounts and set up contract after successful authorization
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  });
});

// Asynchronous function to get mood from the contract and update the UI
async function getMood() {
  const mood = await MoodContract.getMood();
  // Display mood on the UI or indicate if not set
  const moodText = mood ? `Your Mood: ${mood}` : "Your Mood: (not set)";
  document.getElementById("showMood").innerText = moodText;
  console.log(mood);
}

// Asynchronous function to set mood in the contract
async function setMood() {
  const mood = document.getElementById("mood").value;
  await MoodContract.setMood(mood);
  console.log(mood);
}
