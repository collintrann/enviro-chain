const contract = new Contract(abi_erc20, contractAddress, starknet.account);

const balance = await contract.balanceOf(starknet.account.address);
const transfer = await contract.transfer(recipientAddress, amountFormatted);
//or: const transfer = await contract.invoke("transfer", [to, amountFormatted]);

console.log(`Tx hash: ${transfer.transaction_hash}`);
