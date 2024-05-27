/** @type {import('next').NextConfig} */

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tour-55.online',
                pathname: '**',
            },
        ],
    },

    async rewrites() {
        return [
            {
                source: '/online_store/v1/:path*',
                destination: `${process.env.DESTINATION}*`,
            },
        ];
    },
};

export default nextConfig;
