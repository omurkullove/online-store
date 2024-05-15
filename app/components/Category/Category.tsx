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

const Category = ({ data }: { data: ICategoryApiResponse }) => {
    const locale = useLocale();
    const sliderRef = useRef<SwiperRef>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSwiperReady, setIsSwiperReady] = useState(false);
    const [counter, setCounter] = useState(0);
    const max_page = Math.ceil(data.total / data.page_size);

    const isMore = data.total != data.items?.length;

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        if (data.items.length < data.total && sliderRef.current.swiper.isEnd) {
            setIsLoading(true);
            setTimeout(() => {
                router.push(`/?page_category=${Math.max(data.page - 1, 1)}`);
                setIsLoading(false);
            }, 500);
        }
        setCounter((prev) => prev - 1);
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        if (sliderRef.current.swiper.isEnd) {
            if (data.items.length < data.total) {
                setIsLoading(true);

                setTimeout(() => {
                    router.push(`/?page_category=${Math.min(data.page + 1, max_page)}`);
                    setIsLoading(false);
                }, 500);
            }
        }
        setCounter((prev) => prev + 1);
        sliderRef.current.swiper.slideNext();
    }, []);

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

        if ((isMore && sliderRef.current?.swiper.activeIndex === 0 && data.page <= 1) || isLoading) {
            status = true;
        }

        return (
            <BiSolidChevronLeftCircle
                key={counter}
                className={`${styles.arrow} ${status ? styles.inactive : ''}`}
                onClick={handlePrev}
            />
        );
    }, [counter, isSwiperReady, data.page]);

    const renderNextArrow = useCallback(() => {
        if (!isSwiperReady) return;
        if (Number(sliderRef.current?.swiper.params.slidesPerView) >= data.total) return;

        let status = false;

        if ((isMore && data.page === Math.ceil(data.total / data.page_size)) || isLoading) {
            status = true;
        }

        return (
            <BiSolidChevronRightCircle
                className={`${styles.arrow} ${status ? styles.inactive : ''}`}
                onClick={handleNext}
            />
        );
    }, [counter, isSwiperReady, data.page]);

    return (
        <div className={styles.container}>
            <Swiper
                className={styles.list}
                ref={sliderRef}
                spaceBetween={25}
                slidesPerView={handleReturnSlideQuantity()}
                loopAddBlankSlides={false}
                allowTouchMove={false}
                slidesPerGroup={1}
                onInit={() => setIsSwiperReady(true)}
                loop={!isMore}
            >
                {data.items?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div
                            className={styles.item}
                            onClick={() => alert(item.id)}
                        >
                            <Image
                                src={item.image ?? ''}
                                alt='category-image'
                                width={100}
                                height={100}
                                priority
                            />
                            <p>{translated('title', item.translate_content, locale)}</p>
                        </div>
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
