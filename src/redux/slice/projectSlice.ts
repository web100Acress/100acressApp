import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api/apiClient';

export interface Project {
  id: string;
  projectName: string;
  location: string;
  thumbnailImage: string;
  project_url: string;
}

interface ProjectState {
  recommended: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  recommended: [],
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
      });
  },
});

export default projectSlice.reducer;
