import NextAuth from 'next-auth/next';

declare module 'next-auth' {
    interface Session {
        user: {
            email: string;
            first_name: string;
            display_name: string;
            created_at: string;
            token: string;
            user_settings?: {
                theme: string;
                system_language: string;
                products_language: string;
            };
            isLoading: boolean;
        };
    }
}
