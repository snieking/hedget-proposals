import { GlobalState } from './global/global-state';
import { AccountState } from './account/account.state';

export default interface ApplicationState {
  global: GlobalState;
  account: AccountState;
}
