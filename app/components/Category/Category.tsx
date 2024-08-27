import React from 'react';
import styles from './Category.module.scss';
import Image from 'next/image';
import { ICategoryApiResponse, ICategoryItem } from '@/interfaces/ICategory';
import { useLocale } from 'next-intl';
import { translated } from '@/app/utils/helpers';
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from 'react-icons/bi';
import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import 'swiper/css';
import Link from 'next/link';
import categoryService from '@/app/services/categoryService';

const Category = ({ data }: { data: ICategoryApiResponse }) => {
    const locale = useLocale();
    const sliderRef = useRef<SwiperRef>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSwiperReady, setIsSwiperReady] = useState(false);
    const [page, setPage] = useState(2);
    const [list, setList] = useState<ICategoryItem[]>(data.items);
    const [counter, setCounter] = useState(0);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        setCounter((prev) => prev - 1);
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(async () => {
        if (!sliderRef.current) return;

        setCounter((prev) => prev + 1);

        if (sliderRef.current.swiper.isEnd && data.total != list.length) {
            setIsLoading(true);
            setTimeout(async () => {
                const res = await categoryService.GET(String(page), 'paginated');
                const data = res.items;
                setList((prev) => [...prev, ...data]);
                setPage((prev) => prev + 1);
                setIsLoading(false);
            }, 1000);
        }

        sliderRef.current.swiper.slideNext();
    }, [counter]);

    const is400 = useMediaQuery({ query: '(max-width: 400px)' });
    const is500 = useMediaQuery({ query: '(max-width: 500px)' });
    const is750 = useMediaQuery({ query: '(max-width: 750px)' });
    const is1024 = useMediaQuery({ query: '(max-width: 1024px)' });
    const is1404 = useMediaQuery({ query: '(max-width: 1404px)' });

    const handleReturnSlideQuantity = () => {
        if (is400) {
            return 2;
        } else if (is500) {
            return 3;
        } else if (is750) {
            return 3;
        } else if (is1024) {
            return 5;
        } else if (is1404) {
            return 8;
        } else {
            return 10;
        }
    };

    const renderPrevArrow = useCallback(() => {
        if (!isSwiperReady) return;
        if (Number(sliderRef.current?.swiper.params.slidesPerView) >= data.total) return;

        let status = false;

        if (isLoading || (sliderRef.current?.swiper.isBeginning && data.total != list.length)) {
            status = true;
        }

        return (
            <BiSolidChevronLeftCircle
                className={`${styles.arrow} ${status ? styles.inactive : ''}`}
                onClick={handlePrev}
            />
        );
    }, [isSwiperReady, counter, list.length]);

    const renderNextArrow = useCallback(() => {
        if (!isSwiperReady) return;
        if (Number(sliderRef.current?.swiper.params.slidesPerView) >= data.total) return;

        return (
            <BiSolidChevronRightCircle
                className={`${styles.arrow} ${isLoading ? styles.inactive : ''}`}
                onClick={handleNext}
            />
        );
    }, [isSwiperReady, counter, list.length]);

    const handleSwiper = (swiper: any) => {
        setCounter((prev) => prev + 1);
        if (swiper.isEnd && data.total > list.length) {
            setIsLoading(true);
            setTimeout(async () => {
                const res = await categoryService.GET(String(page), 'paginated');
                const data = res.items;
                setList((prev) => [...prev, ...data]);
                setIsLoading(false);
            }, 1000);

            setPage((prev) => prev + 1);
        }
    };

    return (
        <div className={`${styles.container} ${isLoading ? styles.loading : ''}`}>
            <Swiper
                className={styles.list}
                ref={sliderRef}
                spaceBetween={25}
                onTouchEnd={(swiper) => handleSwiper(swiper)}
                slidesPerView={handleReturnSlideQuantity()}
                loopAddBlankSlides={false}
                allowTouchMove={true}
                slidesPerGroup={1}
                onInit={() => setIsSwiperReady(true)}
                loop={data.total == list.length}
            >
                {list.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link
                            href={`/filter/${translated('title', item.translate_content, locale)}/c=${item.id}`}
                            locale={locale}
                            className={styles.item}
                        >
                            <Image
                                src={item.image ?? ''}
                                alt='category-image'
                                width={100}
                                height={100}
                                priority
                                sizes='100px'
                            />
                            <p>{translated('title', item.translate_content, locale)}</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.arrows}>
                {renderPrevArrow()}
                {renderNextArrow()}
            </div>
        </div>
    );
};

export default Category;
