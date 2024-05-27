export interface ITranslation {
    lang_code: string;
    content: {
        title: string;
        description: string;
        name?: string;
    };
}
