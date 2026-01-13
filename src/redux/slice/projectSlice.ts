import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequest } from '../../api/apiClient';

export interface Project {
  id: string;
  projectName: string;
  location: string;
  thumbnailImage: string;
  project_url: string;
}

export interface TrendingProject {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  url: string;
}

interface ProjectState {
  recommended: Project[];
  trending: TrendingProject[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  recommended: [],
  trending: [],
  loading: false,
  error: null,
};

export const fetchRecommendedProjects = createAsyncThunk(
  'project/fetchRecommended',
  async () => {
    const response = await apiRequest('/projects/spotlight');
    return response.data;
  }
);

export const fetchTrendingProjects = createAsyncThunk(
  'project/fetchTrending',
  async () => {
    const response = await apiRequest('/trending');
    return response.data;
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.recommended = action.payload;
      })
      .addCase(fetchRecommendedProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recommended projects';
      })
      .addCase(fetchTrendingProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trending projects';
      });
  },
});

export default projectSlice.reducer;
