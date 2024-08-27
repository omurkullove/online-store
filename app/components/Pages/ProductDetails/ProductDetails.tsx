import { IProductInfo, IProductItem } from '@/interfaces/IProduct';
import styles from './ProductDetails.module.scss';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { numCorrecter, translated } from '@/app/utils/helpers';
import { useLocale } from 'next-intl';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { EffectFade } from 'swiper/modules';
import { useRef, useState } from 'react';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';

import 'swiper/css';
import 'swiper/css/effect-fade';

interface IActiveInfoItem {
    item: IProductInfo;
    index: number;
}

const ProductDetails = ({ item }: { item: IProductItem }) => {
    const [activeInfoItem, setActiveInfoItem] = useState<IActiveInfoItem>({ index: 0, item: item.product_info[0] });
    const locale = useLocale();
    const swiperRef = useRef<SwiperRef>(null);

    const product_info_list = Object.values(item.product_info);

    const next = () => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slideNext();
    };

    const prev = () => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slidePrev();
    };

    const updateActiveItem = () => {
        if (!swiperRef.current) return;
        const activeIndex = swiperRef.current.swiper.realIndex;
        setActiveInfoItem({ index: activeIndex, item: product_info_list[activeIndex] });
    };

    const handleChangeActiveInfoItem = (info_item: IProductInfo, index: number) => {
        if (!swiperRef.current) return;
        setActiveInfoItem({ index, item: info_item });
        swiperRef.current.swiper.slideToLoop(index);
    };

    return (
        <div className={styles.container}>
            <div className={styles.image_container}>
                <div className={styles.top}>
                    <FaArrowLeft onClick={prev} />
                    <Swiper
                        className={styles.img}
                        ref={swiperRef}
                        slidesPerView={1}
                        onSlideChange={updateActiveItem}
                        effect='fade'
                        loop
                        modules={[EffectFade]}
                    >
                        {product_info_list?.map((info_item) =>
                            info_item.images.map((img) => (
                                <SwiperSlide key={img}>
                                    <Image
                                        src={img}
                                        alt='product-image'
                                        className={styles.img_no_select}
                                        sizes='300px'
                                        priority
                                        style={{ objectFit: 'contain' }}
                                        fill
                                    />
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                    <FaArrowRight onClick={next} />
                </div>
                <div className={styles.bottom}>
                    {product_info_list?.map((info_item, index) =>
                        info_item.images.map((img) => (
                            <div
                                key={info_item.images[0]}
                                className={`${styles.img_little} ${
                                    activeInfoItem.index === index ? styles.active : ''
                                }`}
                                onClick={() => handleChangeActiveInfoItem(info_item, index)}
                            >
                                <Image
                                    key={img}
                                    src={img}
                                    alt='product-little-image'
                                    sizes='50px'
                                    priority
                                    style={{ objectFit: 'contain' }}
                                    fill
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className={styles.main_info}>
                <div className={styles.section}>
                    <h1 className={styles.name}>{translated('name', item.translate_content, locale)}</h1>
                    <div className={styles.price_block}>
                        <p className={styles.price}>
                            {numCorrecter(
                                item.product_discount
                                    ? item.price - item.price * (item.product_discount / 100)
                                    : item.price
                            )}{' '}
                            с.
                        </p>
                        {item.product_discount ? <p className={styles.old_price}>{item.price} с.</p> : null}
                    </div>

                    <div className={styles.delivery}>
                        <p className={styles.title}>Доставка:</p>
                        <p className={styles.value}>
                            {item.is_deliverable ? (
                                <IoIosCheckmarkCircle color='green' />
                            ) : (
                                <IoIosCloseCircle color='red' />
                            )}
                        </p>
                    </div>

                    <p className={styles.is_available}>
                        {activeInfoItem.item?.quantity_in_storage ? 'Есть в наличии' : 'Нет в наличии'}
                    </p>

                    <div className={styles.colors_block}>
                        <p className={styles.title}>Цвет</p>
                        <div className={styles.list}>
                            {product_info_list.map((info_item) => (
                                <div
                                    className={styles.color}
                                    style={{
                                        backgroundColor: info_item.color_code,
                                    }}
                                    key={info_item.color_code}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button>Купить</button>
                        <button>В корзину</button>
                    </div>

                    <p className={styles.description}>{translated('description', item.translate_content, locale)}</p>
                </div>

                <ul className={styles.info_item_block}>
                    {item.additional_info.fields.map((field) => (
                        <li
                            className={styles.item}
                            key={field.key[locale]}
                        >
                            <p className={styles.title}>{field.key[locale]}</p>
                            <p className={styles.value}>{field.value}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductDetails;
