export interface Banner {
  _id: string;
  name: string;
  photo: string;
  description?: string;
  page?: string;
  position?: number;
  dataId?: string;
}

export interface UtilitiesResponse {
  data: {
    footerBanners: Banner[];
    headerBanners: Banner[];
  };
  message: string;
  success: boolean;
}

export interface BannersResponse {
  data: Banner[];
  message: string;
  success: boolean;
}

export interface ContentsResponse {
  data: {
    heroSlider: Banner[];
    promoBanner: Banner[];
    adsBanner: Banner[];
    preFBanner: Banner[];
  };
  message: string;
  success: boolean;
}

export interface CategoriesResponse {
  data: any[];
  message: string;
  success: boolean;
}
