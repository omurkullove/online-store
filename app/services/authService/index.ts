import { API_CLIENT, API_SERVER } from '@/app/axios';
import { ILogin, IRegister, IUserSettings } from '@/interfaces/IAuth';
import { redirect } from 'next/navigation';

class AuthService {
    private api_variable: string;

    constructor(api_variable: string) {
        this.api_variable = api_variable;
    }

    async getConfirmCode(email: string) {
        try {
            const res = await API_CLIENT.post(`/${this.api_variable}/pre-register-user`, null, { params: { email } });
            const data = await res.data;
            return data?.detail;
        } catch (err) {
            return false;
        }
    }

    async login(credentials: ILogin) {
        try {
            const res = await API_SERVER.post(`/${this.api_variable}/login-user`, credentials);
            return res;
        } catch (err) {
            return {};
        }
    }

    async getProfile(cookie: string | string[] | '') {
        try {
            const res = await API_SERVER.get(`/${this.api_variable}/get-user-profile`, {
                headers: { Cookie: cookie },
            });

            const data = await res.data;
            return data;
        } catch (err) {
            return {};
        }
    }

    async register(credentials: IRegister) {
        try {
            const res = await API_CLIENT.post(`/${this.api_variable}/register-user`, credentials);
            const data = await res.data;
            return data;
        } catch (err) {
            return {};
        }
    }

    async refresh(cookie: string | string[] | '') {
        try {
            const res = await API_SERVER.post(
                `/${this.api_variable}/refresh-token`,
                {},
                {
                    headers: {
                        Cookie: cookie,
                    },
                }
            );

            return res.headers['set-cookie'];
        } catch (err) {
            return false;
        }
    }

    async updateUserSettings(cookie: string | string[], user_settings: IUserSettings) {
        try {
            const res = await API_SERVER.patch(`/${this.api_variable}/user-settings`, user_settings, {
                headers: { Cookie: cookie },
            });

            return res.data;
        } catch (err) {
            return { data: {} };
        }
    }
}

export default new AuthService('auth');
