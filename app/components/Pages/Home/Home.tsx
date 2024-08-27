import styles from './Home.module.scss';
import { ICategoryApiResponse, ICategoryItem } from '@/interfaces/ICategory';
import 'swiper/css';
import Category from '../../Category/Category';
import Brand from '../../Brand/Brand';
import { IBrandApiResponse } from '@/interfaces/IBrand';
import Products from '../../Products/Products';
import { IProductApiResponse } from '@/interfaces/IProduct';
import Image from 'next/image';
import InfoSection from '../../InfoSection/InfoSection';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Home = ({ brand_data, product_data }: { brand_data: IBrandApiResponse; product_data: IProductApiResponse }) => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.double_container}>
                <Brand data={brand_data} />
                <InfoSection />
            </div>
            <Products data={product_data} />
        </div>
    );
};

export default Home;
