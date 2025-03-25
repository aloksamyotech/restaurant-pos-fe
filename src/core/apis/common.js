import { urls } from 'core/constant/urls';
import { getApi } from './apiClient';
import { jwtDecode } from 'jwt-decode';
export const fetchProfileData = async (id) => {
  try {
    const apiUrl = urls.user.register;
    const response = await getApi(apiUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getPermissionFromToken = () => {
  const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
  if (!token) {
    return null;
  }
  try {
    const decodedToken = jwtDecode(token);

    return decodedToken?.permissions;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export const getUserInfoFromToken = () => {
  const token = localStorage?.getItem('$2b$10$ehdPSDmr6P');
 
  
  if (!token) {
    return null;
  }
  try {
    const decodedToken = jwtDecode(token);
    return {
      firstName: decodedToken?.firstName || 'N/A',
      role: decodedToken?.role || 'N/A',
      id: decodedToken?._id || 'N/A',
    };
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};
