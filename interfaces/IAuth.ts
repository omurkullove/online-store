import { User } from 'next-auth';

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    first_name: string;
    display_name: string;
    password: string;
    password_confirm: string;
    code: string;
}

export interface IUserSettings {
    theme: 'light' | 'dark';
    system_language: string;
    products_language: string;
}

export interface IUserInfo {
    email: string;
    first_name: string;
    display_name: string;
    created_at: string;
    user_settings: IUserSettings;
    isLoading: boolean;
}
