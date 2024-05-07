import { API, API_SERVER } from '@/app/axios';
import authService from '@/app/services/authService';
import { SUCCESS_STATUS } from '@/app/utils/consts';
import { AxiosResponse } from 'axios';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsContainer from 'next-auth/providers/credentials';
import { redirect } from 'next/navigation';

let refreshTokenPromise: any = null;

export const options: NextAuthOptions = {
    providers: [
        CredentialsContainer({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'text' },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return;
                const loginResponse = (await authService.login({
                    email: credentials?.email,
                    password: credentials?.password,
                })) as AxiosResponse;

                if (loginResponse.data.detail !== SUCCESS_STATUS) {
                    throw new Error(loginResponse.data.detail);
                }

                const profileResponse = await authService.getProfile(loginResponse?.headers['set-cookie'] ?? '');

                if (profileResponse) {
                    return {
                        ...profileResponse,
                        token: loginResponse?.headers['set-cookie'],
                        isLoading: false,
                    };
                } else {
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            const regex = /expires=([^;]+)/;

            if (trigger === 'signIn') {
                return { ...token, ...user };
            }

            if (!token.token) {
                redirect('/api/auth/signin');
            }

            const myAccessToken = (token as { token: string[] })?.token[0] ?? '';
            const expiredData = myAccessToken.match(regex) ?? '';
            const expirationDate = new Date(expiredData[1]);

            if (!refreshTokenPromise && Date.now() > expirationDate.getTime()) {
                refreshTokenPromise = authService.refresh(token.token as any);

                try {
                    const refreshedToken = await refreshTokenPromise;
                    if (refreshedToken && refreshedToken.length) {
                        token.token = refreshedToken;
                    } else {
                        token = {};
                    }
                } catch (error) {
                    token = {};
                    redirect('/api/auth/signin');
                } finally {
                    refreshTokenPromise = null;
                }
            }

            if (trigger === 'update' && !refreshTokenPromise && Date.now() < expirationDate.getTime()) {
                token.user_settings = session;
            }

            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;

            return session;
        },
    },
};

export default NextAuth(options);
