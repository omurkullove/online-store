import { API } from '@/app/axios';
import styles from './UserPopup.module.scss';
import { IUserInfo } from '@/interfaces/IAuth';
import { ChangeEventHandler } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { RiLogoutBoxRLine } from 'react-icons/ri';

interface IUserPopupProps {
    isOpen: boolean;

    data: IUserInfo;
}

const UserPopup = ({ isOpen, data }: IUserPopupProps) => {
    const { update } = useSession();
    const router = useRouter();

    const toggleDarkMode: ChangeEventHandler<HTMLInputElement> = async () => {
        const newMode = data.user_settings.theme === 'dark' ? 'light' : 'dark';
        const body = {
            ...data.user_settings,
            theme: newMode,
        };

        try {
            await update(body).then(async (res) => {
                if (res?.user.user_settings) {
                    await API.patch('/api/user-settings', res.user.user_settings);
                    router.replace(router.asPath);
                }
            });
        } catch (error) {
            toast.error('Ошибка при изменении темы');
        }
    };

    return isOpen ? (
        <div className={styles.container}>
            <section className={styles.section}>
                <FaUserCircle className={styles.logo} />
                <div className={styles.info_block}>
                    <p className={styles.name}>{data.first_name}</p>
                    <p className={styles.email}>{data.email}</p>
                </div>
            </section>
            <div className={styles.darkMode_block}>
                <div className={styles.line} />
                <p>Темная тема</p>

                <label className={styles.switch}>
                    <input
                        type='checkbox'
                        checked={data.user_settings.theme === 'dark'}
                        onChange={toggleDarkMode}
                    />
                    <span className={styles.slider}></span>
                </label>
            </div>

            <div className={styles.logout}>
                <button onClick={() => signOut()}>
                    <RiLogoutBoxRLine className={styles.logo} />
                    Выйти
                </button>
            </div>
        </div>
    ) : null;
};

export default UserPopup;
