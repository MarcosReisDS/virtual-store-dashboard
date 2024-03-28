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
    valueSidebar: boolean
    token: string;
    setToken: Dispatch<SetStateAction<string>>
    setUser: Dispatch<SetStateAction<IUserType>>;
    setUsers: Dispatch<SetStateAction<IUserType[]>>;
    onSidebarChange: (value: any) => void;
}

const Contexts = createContext<IContext | {}>({});

export default Contexts