import React from 'react';
import Home from '@Pages/Home/Home';
import categoryService from '@/app/services/categoryService';
import { ICategoryApiResponse } from '@/interfaces/ICategory';
import { GetServerSidePropsContext } from 'next';
import brandService from '@/app/services/brandService';
import { IBrandApiResponse } from '@/interfaces/IBrand';

const HomePage = ({
    category_data,
    brand_data,
}: {
    category_data: ICategoryApiResponse;
    brand_data: IBrandApiResponse;
}) => {
    console.log(brand_data);

    return <Home category_data={category_data} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const query = context.query;
    let pageCategory = Number(query.page_category);

    if (isNaN(pageCategory) || pageCategory <= 0) {
        pageCategory = 1;
    }

    const category_data = await categoryService.GET(pageCategory.toString());
    const max_page = Math.ceil(category_data.total / category_data.page_size);

    const brand_data = await brandService.GET('1');

    if (pageCategory > max_page && category_data.total != 0) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    } else {
        return {
            props: {
                category_data,
                brand_data,
            },
        };
    }
}

export default HomePage;
