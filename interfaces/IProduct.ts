import { ITranslation } from './IBase';
import { IBrandItem } from './IBrand';
import { ICategoryItem } from './ICategory';
import { ISubcategory } from './ISubcategory';

export interface ILanguageKeys {
    [key: string]: string;
}

export interface ProductField {
    key: ILanguageKeys;
    value: string;
}

interface IAdditionalInfo {
    id: string;
    name: string;
    fields: ProductField[];
}

export interface IProductInfo {
    product_id: string | null;
    color_code: string;
    is_storage_countable: boolean;
    quantity_in_storage: number;
    images: string[];
}

export interface IProductItem {
    translate_content: ITranslation[];
    price: number;
    product_discount: number;
    available: boolean;
    is_deliverable: boolean;
    id: string;
    category: ICategoryItem;
    subcategory: ISubcategory;
    product_info: {
        [key: string]: IProductInfo;
    };
    additional_info: IAdditionalInfo;
    brand: IBrandItem;
}

export interface IProductApiResponse {
    page: number;
    page_size: number;
    total: number;
    items: IProductItem[];
}
