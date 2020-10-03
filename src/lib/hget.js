import HGETContract from '../abi/HGET.json';

export default class HGET {
  constructor(web3) {
    this.contract = new web3.eth.Contract(HGETContract.abi, process.env.REACT_APP_HGET_CONTRACT_ADDRESS);
  }

  getAllowance(selectedAddress) {
    return this.contract.methods.allowance(selectedAddress, process.env.REACT_APP_STAKER_CONTRACT_ADDRESS).call();
  }

  async approve(selectedAddress, amount) {
    await this.contract.methods.approve(process.env.REACT_APP_STAKER_CONTRACT_ADDRESS, amount).send({ from: selectedAddress });
  }
}
