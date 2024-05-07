import React from 'react';
import Home from '@Pages/Home/Home';
import categoryService from '@/app/services/categoryService';
import { ICategoryApiResponse } from '@/interfaces/ICategory';
import { GetServerSidePropsContext } from 'next';

const HomePage = ({ data }: { data: ICategoryApiResponse }) => {
    return <Home data={data} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const query = context.query;
    let pageCategory = Number(query.page_category);

    if (isNaN(pageCategory) || pageCategory <= 0) {
        pageCategory = 1;
    }

    const data = await categoryService.GET(pageCategory.toString());
    const max_page = Math.ceil(data.total / data.page_size);

    if (pageCategory > max_page && data.total != 0) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    } else {
        return {
            props: {
                data,
            },
        };
    }
}

export default HomePage;
