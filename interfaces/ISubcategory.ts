import { ITranslation } from './IBase';

export interface ISubcategory {
    translate_content: ITranslation[];
    id: string;
    image: string;
    category_id: string;
}
