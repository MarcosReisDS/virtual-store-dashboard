import { Dispatch, SetStateAction, createContext } from "react";

export interface IUserType {
    id?: number;
    profile: string;
    name: string;
    surname?: string;
    mail?: string;
    admin: boolean;
}

export interface IProductType {
    id?: number;
    image: string;
    name: string;
    description: string;
    price: string;
    quantity: string;
    type: string;
}

export interface IColorType {
    id?: number
    productId?: number
    name: string
    value: string
}

export interface ISizeType {
    id?: number
    productId?: number
    size: string
}

export interface Jwt {
    email: string;
    exp: number;
    iat: number;
    name: string;
    sub: number;
}

export interface IContext {
    user: IUserType
    users: IUserType[]
    products: IProductType[]
    id: any
    product: IProductType
    colors: IColorType[]
    sizes: ISizeType[]
    valueSidebar: boolean
    token: string;
    setUser: Dispatch<SetStateAction<IUserType>>;
    setUsers: Dispatch<SetStateAction<IUserType[]>>;
    setProducts: Dispatch<SetStateAction<IProductType[]>>;
    setId: Dispatch<SetStateAction<any>>;
    setProduct: Dispatch<SetStateAction<IProductType>>;
    setColors: Dispatch<SetStateAction<IColorType[]>>;
    setSizes: Dispatch<SetStateAction<ISizeType[]>>;
    onSidebarChange: (value: any) => void;
}

const Contexts = createContext<IContext | {}>({});

export default Contexts