import { ITranslation } from './IBase';

export interface IBrandItem {
    translate_content: ITranslation[];
    id: string;
    icon: string;
}

export interface IBrandApiResponse {
    page: number;
    page_size: number;
    total: number;
    items: IBrandItem[];
}
