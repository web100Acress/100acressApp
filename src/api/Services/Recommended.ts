
import { apiRequest } from "../apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RecommendedProject = {
  icon: string;
  label: string;
  location: string;
  url: string;
};

export const getRecommendedProject = async (): Promise<RecommendedProject[]> => {
  const token = await AsyncStorage.getItem("ACCESS_TOKEN");

  const res = await apiRequest<any>("project/category?category=spotlight&projects=Oberoi%20Three%20Sixty%20North,Signature%20Sarvam%20at%20DXP%20Estate,M3M%20Elie%20Saab%20at%20SCDA,BPTP%20DownTown%2066", {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {}, 
  });

   console.log(res.data)
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
