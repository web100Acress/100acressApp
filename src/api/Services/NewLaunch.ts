import { apiRequest } from "../apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type NewLaunchProject = {
  icon: string;
  label: string;
  location: string;
  url: string;
};

export const getNewLaunchProject = async (): Promise<NewLaunchProject[]> => {
  const token = await AsyncStorage.getItem("ACCESS_TOKEN");

  const res = await apiRequest<any>("project/upcoming", {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {}, // 👈 guest user support

  });

  console.log("📊 Number of projects returned:", res?.data?.length || 0);
  console.log("✅ New Launch RAW =>", res?.data);

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
