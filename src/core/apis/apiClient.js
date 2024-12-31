import axios from 'axios';

export const sentApi = async (url, data) => {
    try {
       
        

        const response = await axios.post(url, data, {
            headers :{
             'Content-Type': 'multipart/form-data',
           }
           
         });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response || error.message);
        throw new Error(error.response ? error.response.data : error.message);
    }
};

export const postApi = async (url, data, headers = {}) => {
    try {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers
        };
        const response = await axios.post(url, data, { headers: defaultHeaders });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response || error.message);
        throw new Error(error.response ? error.response.data : error.message);
    }
};
export const getApi = async (url, params = {}, headers = {}) => {
    try {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers
        };
        const response = await axios.get(url, {
            headers: defaultHeaders,
            params: params
        });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response || error.message);
        throw new Error(error.response ? error.response.data : error.message);
    }
};
// export const updateApi = async (url, data, headers = {}) => {
//     try {
//         const defaultHeaders = {
//             'Content-Type': 'application/json',
//             ...headers
//         };
//         const response = await axios.put(url, data, { headers: defaultHeaders });
//         return response.data;
//     } catch (error) {
//         console.error('API Error:', error.response || error.message);
//         throw new Error(error.response ? error.response.data : error.message);
//     }
// };
export const updateApi = async (url, data, headers = {}) => {
    try {
        // Check if the data is FormData (i.e., for file uploads)
        const isFormData = data instanceof FormData;

        const defaultHeaders = {
            // Do not set Content-Type header for FormData
            ...headers,
            ...(isFormData ? {} : { 'Content-Type': 'application/json' })
        };

        const response = await axios.put(url, data, { headers: defaultHeaders });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response || error.message);
        throw new Error(error.response ? error.response.data : error.message);
    }
};


export const deleteApi = async (url, headers = {}) => {
    try {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            ...headers
        };
        const response = await axios.delete(url, { headers: defaultHeaders });
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response || error.message);
        throw new Error(error.response ? error.response.data : error.message);
    }
};

