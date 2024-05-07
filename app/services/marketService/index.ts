import { API_SERVER } from '@/app/axios';

class MarkerService {
    async GET() {
        try {
            const res = await API_SERVER.get('/market-global-admin');
            const data = await res.data;

            return data;
        } catch (err) {
            return {};
        }
    }
}

export default new MarkerService();
