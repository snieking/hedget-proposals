import { AccountDetail } from '../redux/account/account.state';
import { query } from '../blockchain/blockchain-helper';

export function isCoreAccount(account: AccountDetail): Promise<boolean> {
  return query('is_core_user', { id: account.accountID }).then((bool: number) => bool !== 0);
}

export function amountStaked(account: AccountDetail): Promise<number> {
  return query('amount_staked', { id: account.accountID });
}
