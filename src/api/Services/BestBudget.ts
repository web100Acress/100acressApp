import { apiRequest } from "../apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type BestBudgetProject = {
  icon: string;
  label: string;
  location: string;
  url: string;
};

export const getBestBudgetProject = async (): Promise<BestBudgetProject[]> => {
  const token = await AsyncStorage.getItem("ACCESS_TOKEN");

  const res = await apiRequest<any>("project/budgethomes", {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  return (res?.data || []).map((item: any) => ({
    icon:
      item.thumbnailImage?.cdn_url ||
      item.thumbnailImage?.url ||
      item.frontImage?.cdn_url ||
      "",

    label: item.projectName || "Unnamed Project",

    location:
      item.projectAddress ||
      item.city ||
      "Location not available",

    url: item.project_url
      ? `https://www.100acress.com/${item.project_url}/`
      : "",
  }));
};
