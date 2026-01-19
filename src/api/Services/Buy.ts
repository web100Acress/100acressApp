import { apiRequest } from "../apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type BuyProject = {
  icon: string;
  label: string;
  location: string;
  url: string;
};

export const getBuyProject = async (): Promise<BuyProject[]> => {
  const token = await AsyncStorage.getItem("ACCESS_TOKEN");

  const res = await apiRequest<any>("property/buy/viewAll", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  // console.log("API RESPONSE =", res);

  const list = res?.ResaleData || [];

  // console.log("SPOTLIGHT DATA =", list);
  // console.log("SPOTLIGHT DATA LENGTH =", list.length);

  return list.map((item: any) => ({
    icon:
      item.frontImage?.cdn_url ||
      item.frontImage?.url ||
      item.otherImage?.[0]?.url ||
      "",

    label: item.propertyName || "Unnamed Project",

    location:
      item.address ||
      item.city ||
      "Location not available",

    url: item.project_url
      ? `https://www.100acress.com/${item.project_url}/`
      : "",
  }));
};
