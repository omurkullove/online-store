import { API_CLIENT, API_SERVER } from '@/app/axios';
import { IBrandApiResponse, IBrandItem } from '@/interfaces/IBrand';

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

    async GET_ONE(id: string) {
        try {
            const res = await API_SERVER.get(`/brand-client?id=${id}`);
            const data = await res.data;

            return data as IBrandItem;
        } catch (err) {
            return {} as IBrandItem;
        }
    }
}

export default new BrandService();
