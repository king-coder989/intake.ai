import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const CONTRACT_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "complaintId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "dataHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "note",
				"type": "string"
			}
		],
		"name": "AuditRecorded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "complaintId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "dataHash",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "note",
				"type": "string"
			}
		],
		"name": "recordAudit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "complaintId",
				"type": "uint256"
			}
		],
		"name": "getAuditCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "complaintId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getAuditEntry",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Hash complaint text using keccak256
function hashComplaintData(complaintText) {
  return ethers.keccak256(ethers.toUtf8Bytes(complaintText));
}

export async function recordAuditOnChain(complaintId, complaintText, note = "Complaint intake logged") {
  // Skip if MetaMask is unavailable
  if (typeof window === "undefined" || !window.ethereum) {
    console.log("MetaMask not available, skipping blockchain audit");
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    // Convert complaintId string to a numeric hash for uint256
    const numericId = BigInt(ethers.keccak256(ethers.toUtf8Bytes(complaintId))) % BigInt(2 ** 64);
    const dataHash = hashComplaintData(complaintText);

    const tx = await contract.recordAudit(numericId, dataHash, note);
    await tx.wait();
    
    console.log("Audit recorded on-chain:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Blockchain audit failed:", error);
    return null;
  }
}
