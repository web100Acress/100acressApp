import { apiRequest } from "../apiClient";
import type {
  TrendingProjectsResponse,
  TrendingProject,
} from "../types";

export async function fetchTrendingProjects(): Promise<TrendingProject[]> {
  console.log("🚀 fetchTrendingProjects() CALLED");

  try {
    console.log("📡 Calling /trending API...");

    const res = await apiRequest<TrendingProjectsResponse>("/api/trending");

    console.log("✅ /trending API RESPONSE:", res);

    if (!res) {
      console.warn("⚠️ API returned EMPTY response");
      return [];
    }

    if (!res.projects) {
      console.warn("⚠️ 'projects' key missing in response");
      console.log("🔍 Full response keys:", Object.keys(res));
      return [];
    }

    console.log("📦 Total projects received:", res.projects.length);

    return res.projects;
  } catch (error) {
    console.error("❌ fetchTrendingProjects ERROR:", error);
    return [];
  }
}
