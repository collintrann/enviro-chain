async function connectWallet() {
  const starknet = await connect();
  console.log(starknet.account);

  const nonce = await starknet.account.getNonce();
  const message = await starknet.account.signMessage();
}
