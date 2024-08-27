import { IProductApiResponse, IProductItem } from '@/interfaces/IProduct';
import styles from './Products.module.scss';
import ProductCard from './ProductCard/ProductCard';
import { useRouter } from 'next/router';
import { useLocale } from 'next-intl';

const Products = ({ data }: { data: IProductApiResponse }) => {
    const locale = useLocale();
    const router = useRouter();

    return (
        <div className={styles.container}>
            {data.items.map((product) => (
                <ProductCard
                    key={product.id}
                    item={product}
                    locale={locale}
                    router={router}
                />
            ))}
        </div>
    );
};

export default Products;
