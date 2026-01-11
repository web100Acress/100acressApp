import { apiRequest } from "./apiClient";
import type { ActiveBannersResponse, Banner } from "./types";

export async function fetchActiveBanners(): Promise<Banner[]> {
  const res = await apiRequest<ActiveBannersResponse>("/api/banners/active");
  return res?.banners || [];
}

export function pickBestBannerUrl(banner: Banner | undefined | null): string | null {
  if (!banner) return null;
  return (
    banner.mobileImage?.cdn_url ||
    banner.mobileImage?.url ||
    banner.image?.cdn_url ||
    banner.image?.url ||
    null
  );
}
