export type BannerImage = {
  public_id?: string;
  url?: string;
  cdn_url?: string;
};

export type TrendingProjectImage = {
  url?: string;
  cdn_url?: string;
};

export type Banner = {
  _id: string;
  title: string;
  subtitle?: string;
  slug?: string;
  image: BannerImage;
  mobileImage?: BannerImage;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TrendingProject = {
  _id: string;
  title: string;
  price: string;
  location: string;
  slug: string;
  image: TrendingProjectImage;
};

export type ActiveBannersResponse = {
  success: boolean;
  banners: Banner[];
};

export type TrendingProjectsResponse = {
  success: boolean;
  projects: TrendingProject[];
};