import { API_SERVER } from '@/app/axios';
import { IBrandApiResponse } from '@/interfaces/IBrand';

class BrandService {
    async GET(page_brand: string | string[]) {
        try {
            const res = await API_SERVER.get(`/brand-client?page=${page_brand}&page_size=20`);
            const data = await res.data;

            return data as IBrandApiResponse;
        } catch (err) {
            return { items: [], page: 1, page_size: 20, total: 0 };
        }
    }
}

export default new BrandService();
