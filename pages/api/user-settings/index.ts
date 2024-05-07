// pages/api/user-theme/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import authService from '@/app/services/authService';
import { getToken } from 'next-auth/jwt';
import { IUserSettings } from '@/interfaces/IAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;

    if (req.method !== 'PATCH' || !body) {
        return res.status(405).end();
    }

    try {
        const token = await getToken({ req });
        const myCookie = token?.token;

        const data = await authService.updateUserSettings(myCookie as unknown as string[], body as IUserSettings);

        if (data.email) {
            return res.status(200).json(data);
        } else {
            return res.status(400).json({ detail: '150' });
        }
    } catch (error) {
        return res.status(500).json({ detail: '150' });
    }
}
