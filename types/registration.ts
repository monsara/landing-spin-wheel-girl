export interface IField {
  id: number;
  name: string;
  isRequired: boolean;
}

export interface ISelectOption {
  id: string|number;
  label: string;
}

export interface IRegistrationResponse {
  accessToken: string;
  tokenType: string;
  expiresAfter: string;
  sessionId: string;
  autologinToken: string;
}