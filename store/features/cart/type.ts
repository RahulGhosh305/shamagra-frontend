export interface CartItem {
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
    quantity?: number;
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}
