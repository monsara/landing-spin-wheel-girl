import type {
  IField,
  IRegistrationResponse,
  ICountry,
  ICurrency,
  ILocale
} from "@/types";
import apiInstance from './instance'

const getRegistrationFields = async ():Promise<{ data: IField[] }> => {
  const response = await apiInstance.get('/api/player/fields/validations', {
    params: { scenario: 'registration' }
  });
  return response.data;
};

const registerUser = async (registrationFormData: any): Promise<{ data: IRegistrationResponse }> => {
  const response = await apiInstance.post('/api/player/register', registrationFormData);
  return response.data;
}

const getUserGeo = async ():Promise<{ data: { country: string } }> => {
  const response = await apiInstance.get('/api/player/init')
  return response.data
}

const getCountries = async ():Promise<{ data: ICountry[] }> => {
  const response = await apiInstance.get('/api/settings/countries')
  return response.data
}

const getCurrencies = async ():Promise<{ data: ICurrency[] }> => {
  const response = await apiInstance.get('/api/settings/currencies')
  return response.data
}

const getLocales = async ():Promise<{ data: ILocale[] }> => {
  const response = await apiInstance.get('/api/settings/locales')
  return response.data
}

export {
  getRegistrationFields,
  registerUser,
  getUserGeo,
  getCountries,
  getCurrencies,
  getLocales
}