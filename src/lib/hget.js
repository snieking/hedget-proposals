import HGETContract from '../abi/HGET.json';
import * as config from '../config';

export default class HGET {
  constructor(web3) {
    this.contract = new web3.eth.Contract(HGETContract.abi, config.eth.hgetContractAddress);
  }

  getAllowance(selectedAddress) {
    return this.contract.methods.allowance(selectedAddress, config.eth.stakerContractAddress).call();
  }

  async approve(selectedAddress, amount) {
    await this.contract.methods.approve(config.eth.stakerContractAddress, amount).send({ from: selectedAddress });
  }
}
