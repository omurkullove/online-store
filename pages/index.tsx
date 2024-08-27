import React from 'react';
import Home from '@Pages/Home/Home';
import categoryService from '@/app/services/categoryService';
import { ICategoryApiResponse } from '@/interfaces/ICategory';
import { GetServerSidePropsContext } from 'next';
import brandService from '@/app/services/brandService';
import { IBrandApiResponse } from '@/interfaces/IBrand';
import productService from '@/app/services/productService';
import { IProductApiResponse } from '@/interfaces/IProduct';
import { useRouter } from 'next/router';

const HomePage = ({
    brand_data,
    product_data,
}: {
    brand_data: IBrandApiResponse;
    product_data: IProductApiResponse;
}) => {
    return (
        <Home
            brand_data={brand_data}
            product_data={product_data}
        />
    );
};

export async function getServerSideProps() {
    const brand_data = await brandService.GET('1', 'default');
    const product_data = await productService.GET();

    return {
        props: {
            brand_data,
            product_data,
        },
    };
}

export default HomePage;
