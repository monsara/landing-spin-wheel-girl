export interface IRate {
  rate: number;
  rateTime: string;
}
export interface ICurrency {
  name: string;
  isBase: boolean;
  isEnabled: boolean;
  code: string;
  symbol: string;
  type: string
  subunitToUnit: number;
  rate: IRate;
  subCurrencies?: ICurrency[];
}

export interface ILocale {
  name: string;
  nativeName: string;
  code: string;
  languageCode: string;
  isDefault: boolean;
  value?:string;
}

export interface ICountry {
  name: string;
  nativeName: string;
  code: string;
  phonePrefix: string;
  currency: string;
  locale: string;
  additionalCurrency: string[];
  value?:string;
}
