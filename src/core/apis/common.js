import { urls } from 'core/constant/urls';
import { getApi } from './apiClient';
export const fetchProfileData = async (id) => {
  try {
    const apiUrl = urls.user.register;
    const response = await getApi(apiUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};
