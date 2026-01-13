import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../api/apiClient";
import type { TrendingProject, TrendingProjectsResponse } from "../../api/types";

export const fetchTrendingProjects = createAsyncThunk<
  TrendingProject[],
  void,
  { rejectValue: string }
>("Trending/fetchTrendingProjects", async (_, { rejectWithValue }) => {
  try {
    console.log("🚀 REDUX: Calling Trending");

    const res = await apiRequest<TrendingProjectsResponse>("/Trending");

    console.log("✅ REDUX: API Response", res);

    return res.projects;
  } catch (err: any) {
    console.log("❌ REDUX: API Error", err);
    return rejectWithValue(err?.message || "Failed to fetch trending projects");
  }
});

type TrendingState = {
  projects: TrendingProject[];
  loading: boolean;
  error: string | null;
};

const initialState: TrendingState = {
  projects: [],
  loading: false,
  error: null,
};

const trendingSlice = createSlice({
  name: "Trending",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingProjects.pending, (state: TrendingState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingProjects.fulfilled, (state: TrendingState, action: { payload: TrendingProject[] }) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchTrendingProjects.rejected, (state: TrendingState, action: { payload?: string }) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default trendingSlice.reducer;
