import { ITranslation } from './IBase';

export interface ISubcategory {
    translate_content: ITranslation[];
    id: string;
    image: string | null;
    category_id: string;
}
