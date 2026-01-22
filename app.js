const ammAddress = "0xYOUR_AMM_ADDRESS";
const tokenAAddress = "0xYOUR_TOKEN_A_ADDRESS";

// Simplified ABIs
const ammABI = [
    "function swapAtoB(uint256 _amountA) external",
    "function getSwapAmount(uint256 _amountIn, uint256 _reserveIn, uint256 _reserveOut) view returns (uint256)",
    "function reserveA() view returns (uint256)",
    "function reserveB() view returns (uint256)"
];
const tokenABI = ["function approve(address spender, uint256 amount) external returns (bool)"];

let provider, signer, ammContract, tokenContract;

async function init() {
    if(window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        ammContract = new ethers.Contract(ammAddress, ammABI, signer);
        tokenContract = new ethers.Contract(tokenAAddress, tokenABI, signer);
    }
}

document.getElementById('inputAmount').addEventListener('input', async (e) => {
    if(!e.target.value) return;
    const amountIn = ethers.utils.parseEther(e.target.value);
    const resA = await ammContract.reserveA();
    const resB = await ammContract.reserveB();
    const out = await ammContract.getSwapAmount(amountIn, resA, resB);
    document.getElementById('outputAmount').value = ethers.utils.formatEther(out);
});

document.getElementById('approveBtn').addEventListener('click', async () => {
    const amount = ethers.utils.parseEther("1000"); // Approve large amount for demo
    const tx = await tokenContract.approve(ammAddress, amount);
    document.getElementById('status').innerText = "Approving...";
    await tx.wait();
    document.getElementById('status').innerText = "Approved!";
});

document.getElementById('swapBtn').addEventListener('click', async () => {
    const val = document.getElementById('inputAmount').value;
    const tx = await ammContract.swapAtoB(ethers.utils.parseEther(val));
    document.getElementById('status').innerText = "Swapping...";
    await tx.wait();
    document.getElementById('status').innerText = "Swap Complete!";
});

init();
