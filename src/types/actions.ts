export type ServerActionSucess = {
  success: true;
  message: string;
};

export type ServerActionError = {
  success: false;
  message: string;
  errors: Array<string>;
};

export type ServerActionReturnType = ServerActionSucess | ServerActionError;
