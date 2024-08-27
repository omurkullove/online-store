import Filter from '@/app/components/Pages/Filter/FilterParams';
import brandService from '@/app/services/brandService';
import categoryService from '@/app/services/categoryService';
import productService from '@/app/services/productService';
import { IBrandApiResponse, IBrandItem } from '@/interfaces/IBrand';
import { ICategoryApiResponse, ICategoryItem } from '@/interfaces/ICategory';
import { IProductApiResponse } from '@/interfaces/IProduct';
import { GetServerSidePropsContext } from 'next';

interface IFilterPageProps {
    product_data: IProductApiResponse;
    brand_data: IBrandApiResponse;
    category: ICategoryItem;
    brand: IBrandItem;
}

const FilterPage = ({ brand_data, product_data, category, brand }: IFilterPageProps) => {
    return (
        <Filter
            brand_data={brand_data}
            product_data={product_data}
            category={category}
            brand={brand}
        />
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const query = context.query;
    const list: string[] = (query.filter as string[]) ?? [];
    const id = list.find((item) => item.startsWith('c=') || item.startsWith('b='));

    if (!id) {
        return {
            redirect: {
                destination: `/${context.locale !== 'en' ? context.locale : ''}`,
                permanent: false,
            },
        };
    }

    const key = id.startsWith('c=') ? 'category_id' : 'brand_id';
    const params = { [key]: id.substring(2) };

    let category: ICategoryItem | null = null;
    let brand: IBrandItem | null = null;

    if (key === 'category_id') {
        category = await categoryService.GET_ONE(params.category_id!);
    } else {
        brand = await brandService.GET_ONE(params.brand_id!);
    }

    if ((key === 'category_id' && (!category || category.detail)) || (key === 'brand_id' && (!brand || brand.detail))) {
        return {
            redirect: {
                destination: `/${context.locale !== 'en' ? context.locale : ''}`,
                permanent: false,
            },
        };
    }

    const product_data: IProductApiResponse = await productService.GET_FILTERED(params);
    const brand_data: IBrandApiResponse = await brandService.GET('1', 'default');

    return {
        props: {
            product_data,
            brand_data,
            category,
            brand,
        },
    };
}
export default FilterPage;
