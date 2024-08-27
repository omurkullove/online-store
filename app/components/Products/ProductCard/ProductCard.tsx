import { IProductItem } from '@/interfaces/IProduct';
import styles from './ProductCard.module.scss';
import Image from 'next/image';
import { numCorrecter, translated } from '@/app/utils/helpers';
import { NextRouter } from 'next/router';
import Link from 'next/link';

const ProductCard = ({ item, locale, router }: { item: IProductItem; locale: string; router: NextRouter }) => {
    const handleViewDetails = async () => {
        await router.push(
            `/${router.locale}/product/${translated('name', item.translate_content, locale)}/${item.id}`,
            `/${router.pathname}/product/${translated('name', item.translate_content, locale)}/${item.id}`,
            { locale: locale }
        );
    };

    return (
        <div className={styles.container}>
            {item.product_discount ? (
                <div className={styles.discount}>
                    <p>{item.product_discount}%</p>
                </div>
            ) : null}

            <div className={styles.img}>
                <Image
                    src={item.images[0]}
                    alt='product-image'
                    style={{ objectFit: 'cover' }}
                    fill
                    sizes='200px'
                />
            </div>

            <div className={styles.info_block}>
                <p className={styles.name}>{translated('name', item.translate_content, locale)}</p>
                {item.product_discount ? (
                    <div className={styles.discounted}>
                        {numCorrecter(item.price - item.price * (item.product_discount / 100))} с.
                        <p className={styles.old_price}>{numCorrecter(item.price)} c.</p>
                    </div>
                ) : (
                    <p className={styles.price}>{numCorrecter(item.price)} с.</p>
                )}
            </div>
            <div className={styles.footer}>
                <button>Купить</button>
                <Link
                    className={styles.details}
                    href={`/product/${translated('name', item.translate_content, locale)}/${item.id}`}
                    locale={locale}
                >
                    Подробнее
                </Link>
            </div>
            {!item.available && (
                <div className={styles.unavailable_wrapper}>
                    <p>Нет в наличии</p>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
