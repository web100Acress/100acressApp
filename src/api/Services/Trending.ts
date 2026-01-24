import { apiRequest } from "../apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TrendingProject = {
  icon: string;
  label: string;
  location: string;
  url: string;
};

export const getTrendingProject = async (): Promise<TrendingProject[]> => {
  try {
    const token = await AsyncStorage.getItem("ACCESS_TOKEN");

    const res = await apiRequest<any>(
      "project/projectsearch?city=Gurugram&limit=0",
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      }
    );

    const list =
      res?.data?.data ||   // most common
      res?.data ||         // fallback
      [];

    return list.map((item: any) => ({
      icon:
        item?.thumbnailImage?.cdn_url ||
        item?.thumbnailImage?.url ||
        item?.frontImage?.cdn_url ||
        item?.frontImage?.url ||
        "https://via.placeholder.com/300x200",

      label: item?.projectName || "Unnamed Project",

      location:
        item?.projectAddress ||
        item?.city ||
        "Location not available",

      url: item?.project_url
        ? `https://www.100acress.com/${item.project_url}/`
        : "",
    }));
  } catch (error) {
    return [];
  }
};
