import axios from 'axios';

const API_BASE_URL = 'https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', 
  },
});


const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error?.message || 'Something went wrong with the API request.';
  } else if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred.';
};


export const login = async (credentials: { identifier: string; password: string }) => {
  try {

    const formData = new URLSearchParams();
    formData.append('identifier', credentials.identifier);
    formData.append('password', credentials.password);

    const response = await api.post('/auth/local', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
    });


    if (response.data.jwt) {
      localStorage.setItem('token', response.data.jwt);
    }

    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};


export const register = async (userData: { username: string; email: string; password: string }) => {
  try {
    const response = await api.post('/auth/local/register', userData);


    if (response.data.jwt) {
      localStorage.setItem('token', response.data.jwt);
    }

    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};


export const fetchArticles = async (params: { page?: number; limit?: number }) => {
  try {
    const response = await api.get('/articles', {
      params: {
        'pagination[page]': params.page || 1,
        'pagination[pageSize]': params.limit || 10,
        populate: '*', 
      },
    });

    console.log('API Response:', response.data); 

    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};




export const fetchArticleById = async (documentId: string) => {
  try {
    const token = localStorage.getItem('token'); 

    if (!token) {
      throw new Error('Unauthorized! Please login first.');
    }

    const response = await api.get(`/articles/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    console.log('Fetched Article:', response.data); 

    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error); 
    throw new Error(handleApiError(error));
  }
};

export const createArticle = async (articleData: {
  title: string;
  description: string;
  cover_image_url: string;
  category: number;
}) => {
  try {
    const token = localStorage.getItem('token'); 

    if (!token) {
      throw new Error('Unauthorized! Please login first.');
    }

    const response = await api.post(
      '/articles',
      { data: articleData }, 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    console.log('Article Created:', response.data); 

    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const deleteArticle = async (documentId: string) => {
  try {
    const token = localStorage.getItem('token'); 

    if (!token) {
      throw new Error('Unauthorized! Please login first.');
    }

    const response = await api.delete(`/articles/${documentId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    console.log('Article Deleted:', response.data); 

    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};




