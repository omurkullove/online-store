import { ReactNode, useEffect, useState } from 'react';
import styles from './Wrapper.module.scss';
import Header from '../Header/Header';
import { IUserInfo } from '@/interfaces/IAuth';
import { IMarket } from '@/interfaces/IMarket';

interface IWrapperProps {
    children: ReactNode;
    user: IUserInfo;
    market: IMarket;
}

const Wrapper = ({ children, user, market }: IWrapperProps) => {
    const scrollPosition = useScrollPosition();

    return (
        <div className={styles.container}>
            <div className={`${styles.header_container} ${scrollPosition > 0 ? styles.shadow : ''}`}>
                <Header
                    user={user}
                    market={market}
                />
            </div>
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
