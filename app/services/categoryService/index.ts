import { API_SERVER } from '@/app/axios';
import { ICategoryApiResponse } from '@/interfaces/ICategory';

class CategoryService {
    async GET(page_category: string | string[]) {
        try {
            const res = await API_SERVER.get(`/category-client?page=${page_category}&page_size=20`);
            const data = await res.data;

            return { ...data, blurredImages: [] } as ICategoryApiResponse;
        } catch (err) {
            return { items: [], page: 1, page_size: 20, total: 0 };
        }
    }
}

export default new CategoryService();
