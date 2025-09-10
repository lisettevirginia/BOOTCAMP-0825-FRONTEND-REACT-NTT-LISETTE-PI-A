export interface Product {
    id: number;
    tittle: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    stock: number;
}

//Tipos para autenticación
export interface User{
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
}

export interface LoginformData{
    username: string;
    password: string;
}

export interface CartItem{
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    total: number;
}