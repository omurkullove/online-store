import { ITranslation } from '@/interfaces/IBase';

export const translated = (key: 'title' | 'description' | 'name', translate_array: ITranslation[], locale: string) => {
    if (!Array.isArray(translate_array)) {
        return 'Отсутствует перевод';
    }

    if (translate_array.length <= 1) {
        return translate_array[0].content[key];
    }

    const correct_translate = translate_array.find((item) => item.lang_code === locale);

    return correct_translate?.content[key] ?? 'Отсутствует перевод';
};

export const numCorrecter = (number: string | number) => {
    return new Intl.NumberFormat('ru-RU').format(Number(number));
};
