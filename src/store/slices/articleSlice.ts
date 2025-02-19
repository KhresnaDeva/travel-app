import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ArticleState {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  currentPage: 1,
  totalPages: 1,
  status: 'idle',
  error: null,
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ page = 1, limit = 9 }: { page?: number; limit?: number }) => {
    const response = await axios.get('/api/articles', {
      params: {
        page,
        limit,
      },
    });
    return {
      articles: response.data.data,
      totalPages: Math.ceil(response.data.total / limit),
      currentPage: page,
    };
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers(builder) {
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
      });
  },
});

export default articleSlice.reducer;