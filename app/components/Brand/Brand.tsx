import Image from 'next/image';
import styles from './Brand.module.scss';
import { IBrandApiResponse } from '@/interfaces/IBrand';
import { translated } from '@/app/utils/helpers';
import { useLocale } from 'next-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import brandService from '@/app/services/brandService';
import { ImSpinner2 } from 'react-icons/im';
import { FaArrowRight } from 'react-icons/fa';

const Brand = ({ data }: { data: IBrandApiResponse }) => {
    const locale = useLocale();

    const [list, setList] = useState(data.items);
    const [page, setPage] = useState(data.page);
    const [isLoading, setIsLoading] = useState(false);

    const width = useWindowSize();

    const handleFetchNew = () => {
        setIsLoading(true);
        setTimeout(async () => {
            const res = await brandService.GET(String(page + 1), 'paginated');
            const data = res.items;
            setList((prev) => [...prev, ...data]);
            setPage((prev) => prev + 1);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div
            className={styles.container}
            id='brand-container'
        >
            <InfiniteScroll
                className={styles.list}
                dataLength={list.length}
                next={handleFetchNew}
                hasMore={list.length != data.total}
                scrollableTarget={'brand-container'}
                loader={<ImSpinner2 className={styles.loading} />}
            >
                {list.map((item) => (
                    <div
                        className={styles.item}
                        key={item.id}
                        onClick={() => alert(item.id)}
                    >
                        <div className={styles.icon}>
                            <Image
                                src={item.icon ?? ''}
                                alt='icon'
                                fill
                                sizes='25px'
                                style={{ objectFit: 'contain' }}
                            />
                        </div>

                        <p className={styles.name}>{translated('name', item.translate_content, locale)}</p>
                    </div>
                ))}
                {list.length != data.total && width && width <= 1024 ? (
                    <div className={styles.loadMore_block}>
                        {isLoading ? (
                            <ImSpinner2 className={styles.loading} />
                        ) : (
                            <FaArrowRight
                                className={styles.icon}
                                onClick={handleFetchNew}
                            />
                        )}
                    </div>
                ) : null}
            </InfiniteScroll>
        </div>
    );
};

export default Brand;

function useWindowSize() {
    const [windowSize, setWindowSize] = useState<undefined | number>(undefined);

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
}
