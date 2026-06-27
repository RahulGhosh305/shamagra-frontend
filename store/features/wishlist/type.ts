export interface WishlistItem {
    _id: string;
    product: {
        title: string;
        author?: string;
    };
    photo: string;
    pricing: {
        originalPrice: number;
        discountPrice?: number;
        currency?: string;
    };
}

export interface WishlistState {
    items: WishlistItem[];
}
