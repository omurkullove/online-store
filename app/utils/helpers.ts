import { ITranslation } from '@/interfaces/IBase';

export const translated = (key: 'title' | 'description', translate_array: ITranslation[], locale: string) => {
    if (translate_array.length <= 1) {
        return translate_array[0].content[key];
    }

    const correct_translate = translate_array.find((item) => item.lang_code === locale);

    return correct_translate?.content[key] ?? 'Отсутствует перевод';
};
