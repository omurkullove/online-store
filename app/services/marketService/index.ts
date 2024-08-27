import { API_SERVER } from '@/app/axios';
import { IMarket } from '@/interfaces/IMarket';

class MarkerService {
    async GET() {
        try {
            const res = await API_SERVER.get('/market-client');
            const data = await res.data;

            return data as IMarket;
        } catch (err) {
            return {
                name: '',
                contact_details: {},
                description: '',
                address: '',
                image: '',
                features: { online_payment: false, user_auth: false },
            } as IMarket;
        }
    }
}

export default new MarkerService();
