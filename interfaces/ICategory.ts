import { ITranslation } from './IBase';
import { ISubcategory } from './ISubcategory';

export interface ICategoryItem {
    translate_content: ITranslation[];
    id: string;
    subcategories?: ISubcategory[];
    image: string;
    icon: string | null;
    detail?: string;
}

export interface ICategoryApiResponse {
    page: number;
    page_size: number;
    total: number;
    items: ICategoryItem[];
}
