export interface AuthState {
    token: string | null;
    user: any | null; // Adjust user type according to your backend payload
}

export interface LoginRequest {
    email: string;
    password: string;
    remember?: boolean;
}

export interface LoginResponse {
    data: {
        access: {
            token: string;
            expires?: string;
        };
        refresh: {
            token: string;
            expires?: string;
        };
        user: any;
    };
    message: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    data: {
        access: {
            token: string;
            expires?: string;
        };
        refresh: {
            token: string;
            expires?: string;
        };
        user: any;
    };
    message: string;
}
