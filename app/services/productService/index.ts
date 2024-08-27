import { API_SERVER } from '@/app/axios';
import { IProductApiResponse, IProductItem } from '@/interfaces/IProduct';

class ProductService {
    async GET() {
        try {
            const res = await API_SERVER.get('/product-client');
            const data = await res.data;

            return data as IProductApiResponse;
        } catch (err) {
            return {
                items: [],
                page: 1,
                page_size: 20,
                total: 0,
            } as IProductApiResponse;
        }
    }

    async GET_DETAILS(id: string) {
        try {
            const res = await API_SERVER.get('/product-client', { params: { id } });

            const data = await res.data;

            return data;
        } catch (err) {
            return {};
        }
    }

    async GET_FILTERED(params: object) {
        try {
            const res = await API_SERVER.get('/product-client', { params });

            const data = await res.data;

            return data;
        } catch (err) {
            return {
                items: [],
                page: 1,
                page_size: 20000,
                total: 0,
            } as IProductApiResponse;
        }
    }
}

export default new ProductService();
