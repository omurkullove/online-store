import { ReactNode, useEffect, useState } from 'react';
import styles from './Wrapper.module.scss';
import Header from '../Header/Header';
import { IUserInfo } from '@/interfaces/IAuth';
import { IMarket } from '@/interfaces/IMarket';
import Category from '../Category/Category';
import { useRouter } from 'next/router';
import { ICategoryApiResponse, ICategoryItem } from '@/interfaces/ICategory';

interface IWrapperProps {
    children: ReactNode;
    user: IUserInfo;
    market: IMarket;
    category: ICategoryApiResponse;
}

const Wrapper = ({ children, user, market, category }: IWrapperProps) => {
    const scrollPosition = useScrollPosition();
    const { pathname } = useRouter();

    return (
        <div className={styles.container}>
            <div
                className={`${styles.header_container} ${scrollPosition > 0 ? styles.shadow : ''} ${
                    pathname === '/error' ? styles.hide : ''
                }`}
            >
                <Header
                    user={user}
                    market={market}
                />
            </div>
            {['/', '/product/[...product]', '/filter/[...filter]'].includes(pathname) ? (
                <Category data={category} />
            ) : null}
            {children}
        </div>
    );
};

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosition;
};

export default Wrapper;
