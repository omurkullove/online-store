export interface IMarket {
    name: string;
    description: string;
    address?: string;
    contact_details: object;
    features: {
        user_auth: boolean;
        online_payment: boolean;
    };
    image?: string;
}
