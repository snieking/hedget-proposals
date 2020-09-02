export enum GlobalActionTypes {
  SET_LOADING = 'GLOBAL/LOADING/SET',
  SET_OPERATION_PENDING = 'GLOBAL/OPERATION_PENDING/SET',
}

export interface GlobalState {
  loading: boolean;
  operationPending: boolean;
}
