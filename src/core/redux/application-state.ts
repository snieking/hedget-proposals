import { GlobalState } from './global/global-state';
import { AccountState } from './account/account.state';
import { SnackbarState } from './snackbar/snackbar-state';

export default interface ApplicationState {
  global: GlobalState;
  account: AccountState;
  snackbar: SnackbarState;
}
