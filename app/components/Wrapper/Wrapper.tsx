import { ReactNode } from 'react';
import styles from './Wrapper.module.scss';
import Header from '../Header/Header';
import { IUserInfo } from '@/interfaces/IAuth';

interface IWrapperProps {
    children: ReactNode;
    user: IUserInfo;
}

const Wrapper = ({ children, user }: IWrapperProps) => {
    return (
        <div className={styles.container}>
            <Header user={user} />
            {children}
        </div>
    );
};

export default Wrapper;
