import { API_CLIENT, API_SERVER } from '@/app/axios';
import { IBrandApiResponse } from '@/interfaces/IBrand';

class BrandService {
    async GET(page_brand: string | string[], type: 'default' | 'paginated') {
        try {
            const res = await (type === 'default' ? API_SERVER : API_CLIENT).get(
                `/brand-client?page=${page_brand}&page_size=20`
            );
            const data = await res.data;

            return data as IBrandApiResponse;
        } catch (err) {
            return {
                items: [],
                page: 1,
                page_size: 20,
                total: 0,
            } as IBrandApiResponse;
        }
    }
}

export default new BrandService();
