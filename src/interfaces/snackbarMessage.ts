export enum Severity {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface SnackbarMessage {
  state: boolean;
  severity?: Severity;
  message?: string;
}
