import axios from 'axios';

const API_BASE_URL = 'https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔥 Fungsi untuk menangani error API
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data); // Debugging
    return error.response?.data?.error?.message || 'Something went wrong with the API request.';
  } else if (error instanceof Error) {
    console.error('General Error:', error.message); // Debugging
    return error.message;
  }
  return 'An unexpected error occurred.';
};

// ✅ Login API (Gunakan `application/x-www-form-urlencoded`)
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

    console.log('Login Successful:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ✅ Register API
export const register = async (userData: { username: string; email: string; password: string }) => {
  try {
    const response = await api.post('/auth/local/register', userData);

    if (response.data.jwt) {
      localStorage.setItem('token', response.data.jwt);
    }

    console.log('Registration Successful:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ✅ Fetch Articles (Gunakan pagination & populate untuk mendapatkan data lengkap)
export const fetchArticles = async (params: { page?: number; limit?: number }) => {
  try {
    const response = await api.get('/articles', {
      params: {
        'pagination[page]': params.page || 1,
        'pagination[pageSize]': params.limit || 10,
        populate: '*',
      },
    });

    console.log('Fetched Articles:', response.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ✅ Fetch Single Article by ID (Menggunakan token)
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
    throw new Error(handleApiError(error));
  }
};

// ✅ Create New Article (Menggunakan token)
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

// ✅ Delete Article by ID (Menggunakan token)
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
