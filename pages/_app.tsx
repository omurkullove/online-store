import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import '@app/global.scss';
import Wrapper from '@/app/components/Wrapper/Wrapper';
import { Lato } from 'next/font/google';
import App from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { NextIntlClientProvider } from 'next-intl';
import { Router, useRouter } from 'next/router';

import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import NProgressContainer from 'nextjs-progressbar';
import { use, useEffect, useState } from 'react';
import { SessionProvider, getSession, useSession } from 'next-auth/react';
import ToastProvider from '@/app/providers/ToastProvider';
import { CtxOrReq } from 'next-auth/client/_utils';
import { IUserInfo } from '@/interfaces/IAuth';
import ScreenLoading from '@/app/components/ScreenLoading/ScreenLoading';

const font = Lato({ weight: ['300', '100', '700', '900', '400'], subsets: ['latin'], display: 'swap' });

interface ICustomAppProps extends AppProps {
    user: IUserInfo;
    messages: any;
}

export default function MyApp({ Component, pageProps, user, messages }: ICustomAppProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => {
            NProgress.start();
            setLoading(true);
        };

        const handleComplete = () => {
            NProgress.done();
            setLoading(false);
        };

        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleComplete);
        Router.events.on('routeChangeError', handleComplete);

        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleComplete);
            Router.events.off('routeChangeError', handleComplete);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Online Store</title>
                <meta
                    name='description'
                    content='This is awesome and user-friendly online store. Here you can find necessary items'
                />
                <meta
                    name='keywords'
                    content='online, website, site, store, shop, online store, internet store'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0'
                />
                <link
                    rel='icon'
                    href='/logo.png'
                    sizes='any'
                />
            </Head>

            <main
                id='main'
                className={font.className}
                data-theme={user ? user?.user_settings?.theme : 'light'}
            >
                <NProgressContainer
                    color='#e0115f'
                    options={{ showSpinner: true, easing: 'ease' }}
                />
                <AnimatePresence>
                    <NextIntlClientProvider
                        locale={router.locale}
                        timeZone='Europe/Vienna'
                        messages={messages}
                    >
                        <SessionProvider>
                            <AnimatePresence>{loading || user?.isLoading ? <ScreenLoading /> : null}</AnimatePresence>
                            <Wrapper user={user}>
                                <ToastProvider>
                                    <Component {...pageProps} />
                                </ToastProvider>
                            </Wrapper>
                        </SessionProvider>
                    </NextIntlClientProvider>
                </AnimatePresence>
            </main>
        </>
    );
}

MyApp.getInitialProps = async (context: AppContext): Promise<{ messages: any; user: IUserInfo } & AppInitialProps> => {
    const ctx = await App.getInitialProps(context);
    const session = await getSession(context as CtxOrReq);

    const userInfo = session?.user as IUserInfo;

    return {
        ...ctx,
        user: userInfo,
        messages: (await import(`../messages/${context.router.locale}.json`)).default,
    };
};
