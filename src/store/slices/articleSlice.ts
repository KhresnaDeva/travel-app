import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  content: string;
}


interface ArticleState {
  articles: Article[];
  selectedArticle: Article | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalPages: number;
  currentPage: number;
}


const initialState: ArticleState = {
  articles: [],
  selectedArticle: null,
  status: 'idle',
  error: null,
  totalPages: 1,
  currentPage: 1,
};


export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ page = 1, limit = 9 }: { page?: number; limit?: number }) => {
    const response = await axios.get('/api/articles', {
      params: { page, limit },
    });
    return {
      articles: response.data.data,
      totalPages: Math.ceil(response.data.total / limit),
      currentPage: page,
    };
  }
);


export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/articles/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);


const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })

      .addCase(fetchArticleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});


export default articleSlice.reducer;
