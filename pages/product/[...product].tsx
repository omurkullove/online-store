import ProductDetails from '@/app/components/Pages/ProductDetails/ProductDetails';
import productService from '@/app/services/productService';
import { IProductItem } from '@/interfaces/IProduct';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

const ProductDetailsPage = ({ item }: { item: IProductItem }) => {
    return <ProductDetails item={item} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const query = context.query;

    if (!query.product) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    const id = query.product[1];

    const item: IProductItem = await productService.GET_DETAILS(id);

    if (!item) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    } else {
        return {
            props: {
                item,
            },
        };
    }
}

export default ProductDetailsPage;
