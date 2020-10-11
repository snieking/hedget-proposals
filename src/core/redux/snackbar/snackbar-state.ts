export enum SnackbarActionTypes {
  NOTIFY_SUCCESS = 'SNACKBAR/NOTIFY_SUCCESS',
  CLEAR_SUCCESS = 'SNACKBAR/CLEAR_SUCCESS',
  NOTIFY_ERROR = 'SNACKBAR/NOTIFY_ERROR',
  CLEAR_ERROR = 'SNACKBAR/CLEAR_ERROR',
}

export interface SnackbarState {
  successMessage: string;
  errorMessage: string;
}
