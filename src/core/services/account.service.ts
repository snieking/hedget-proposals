import { AccountDetail } from '../redux/account/account.state';
import { query } from '../blockchain/blockchain-helper';
import { StakeDetails } from './account.model';

export function isCoreAccount(account: AccountDetail): Promise<boolean> {
  return query('is_core_user', { id: account.accountID }).then((bool: number) => bool !== 0);
}

export function amountStaked(account: AccountDetail): Promise<number> {
  return query('amount_staked', { id: account.accountID });
}

export function getEthAddress(account: AccountDetail): Promise<string> {
  return query('get_eth_address', { id: account.accountID });
}

export function getStakeByEthAddress(address: string): Promise<StakeDetails> {
  return query('stake_by_eth_addr',  { eth_addr: address });
}
