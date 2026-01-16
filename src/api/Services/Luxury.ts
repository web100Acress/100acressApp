import { apiRequest } from "../apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type LuxuryProject = {
  icon: string;
  label: string;
  location: string;
  url: string;
};

export const getLuxuryProjects = async (): Promise<LuxuryProject[]> => {
  const token = await AsyncStorage.getItem("ACCESS_TOKEN");

  const res = await apiRequest<any>("/project/luxury", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // ✅ Always return ARRAY
  return (res?.data || []).map((item: any) => ({
    icon: item.thumbnail || item.image,
    label: item.project_name || item.name,
    location: item.location,
    url: `https://www.100acress.com/${item.slug}/`,
  }));
};
