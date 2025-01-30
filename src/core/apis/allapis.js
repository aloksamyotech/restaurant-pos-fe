import { urls } from 'core/constant/urls';
import { getApi } from './apiClient';

export const getAllItems = async () => {
  try {
    const url = urls?.item.get;
    const response = await getApi(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
