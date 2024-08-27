import { API_CLIENT, API_SERVER } from '@/app/axios';
import { ICategoryApiResponse, ICategoryItem } from '@/interfaces/ICategory';

class CategoryService {
    async GET(page_category: string | string[], action: 'default' | 'paginated') {
        try {
            const res = await (action === 'default' ? API_SERVER : API_CLIENT).get(
                `/category-client?page=${page_category}&page_size=20`
            );
            const data = await res.data;

            return data as ICategoryApiResponse;
        } catch (err) {
            return { items: [], page: 1, page_size: 20, total: 0 };
        }
    }

    async GET_ONE(id: string) {
        try {
            const res = await API_SERVER.get(`/category-client?id=${id}`);
            const data = await res.data;

            return data as ICategoryItem;
        } catch (err) {
            return {} as ICategoryItem;
        }
    }
}

export default new CategoryService();
