export const provider = new Provider({
  sequencer: {
    network: "goerli-alpha",
  },
  // rpc: {
  //   nodeUrl: INFURA_ENDPOINT
  // }
});

const block = await provider.getBlock("latest"); // <- Get latest block
console.log(block.block_number);