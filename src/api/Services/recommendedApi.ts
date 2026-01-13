import { apiRequest } from "../apiClient";

export const getRecommendedProjects = async () => {
  const res = await apiRequest<any>("/api/projects/spotlight");

  return res.data.map((item: any) => ({
    icon: item.thumbnail,
    label: item.project_name,
    location: item.location,
    url: `https://www.100acress.com/${item.slug}/`,
  }));
};
