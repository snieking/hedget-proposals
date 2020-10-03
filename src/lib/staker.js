import StakerContract from '../abi/Staker.json';

export default class Staker {
  constructor(web3) {
    this.contract = new web3.eth.Contract(StakerContract.abi, process.env.REACT_APP_STAKER_CONTRACT_ADDRESS);
  }

  async getStakeState(address) {
    const stake = await this.contract.methods.getStakeState(address).call();

    const amount = +stake['0'];
    const until = +stake['1'];

    if (amount === 0 && until === 0) return null;
    return {
      amount,
      until,
      isFresh: Date.now() + 86400 * 7 * 1000 > until * 1000,
    };
  }

  async stake(address, amount, until) {
    await this.contract.methods.stake(amount, until).send({ from: address });
    return this.getStakeState(address);
  }
}
