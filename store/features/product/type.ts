export interface ProductState {
  searchQuery: string;
}

export type PriceFilterParam = "LowToHigh" | "HighToLow" | "Free";

export interface WorkspaceProduct {
  _id: string;
  photo?: string;
  file?: string;
  product: {
    productCode?: string;
    title: string;
    subTitle?: string;
    author?: string;
  };
  pricing: {
    originalPrice: number;
    discountPrice?: number;
    discountPercentage?: number;
    currency?: string;
  };
  rating?: {
    averageScore: number;
    totalReviews: number;
  };
  description?: {
    short?: string;
    long?: string;
  };
  authorDescription?: string;
  shippingInfo?: {
    freeShippingThreshold?: string;
    returnPolicy?: string;
    secureShopping?: string;
  };
  specifications?: {
    format?: string;
    totalPages?: string;
    publishDate?: string;
    language?: string;
    originCountry?: string;
    dimensions?: string;
    weight?: string;
    sku?: string;
    category?: {
      _id: string;
      name: string;
    };
  };
  features?: string[];
  status?: string;
}

export interface ProductFilterParams {
  category?: string[];
  author?: string[];
  price?: PriceFilterParam;
  hasImage?: boolean;
  limit?: number;
}

export interface ProductSearchParams {
  q: string;
  limit?: number;
}

export interface ProductsResponse {
  data: WorkspaceProduct[];
  message: string | null;
  stack?: unknown;
}

export interface SearchProductsResponse {
  data: {
    items: WorkspaceProduct[];
    total: number;
    page: number;
    limit: number;
  };
  message: string | null;
  stack?: unknown;
}

export interface ProductResponse {
  data: WorkspaceProduct;
  message: string | null;
  stack?: unknown;
}
