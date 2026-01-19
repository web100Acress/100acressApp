import { apiRequest } from "../apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RentProject = {
  icon: string;
  label: string;
  location: string;
  url: string;
};

export const getRentProject = async (): Promise<RentProject[]> => {
  const token = await AsyncStorage.getItem("ACCESS_TOKEN");

  const res = await apiRequest<any>("property/rent/viewAll", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  console.log("RENT API RESPONSE =", res);

  const list = res?.rentaldata || [];

  console.log("rent DATA =", list);
  console.log("rent DATA LENGTH =", list.length);

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
