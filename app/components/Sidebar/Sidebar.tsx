import { FaLocationDot, FaPhone } from 'react-icons/fa6';
import styles from './Sidebar.module.scss';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { IoLanguage } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useLocale, useTranslations } from 'next-intl';
import { IUserInfo } from '@/interfaces/IAuth';
import { FaUserCircle } from 'react-icons/fa';
import { ChangeEventHandler, use } from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { signOut, useSession } from 'next-auth/react';
import { FiLogIn } from 'react-icons/fi';
import { API } from '@/app/axios';
import { toast } from 'react-toastify';
import { IMarket } from '@/interfaces/IMarket';
interface ISidebarProps {
    onClose: () => void;
    user: IUserInfo;
    market: IMarket;
}

const Sidebar = ({ onClose, user, market }: ISidebarProps) => {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('Header');

    const { asPath } = router;
    const { update } = useSession();

    const handleChangeLanguage = async (lang: string) => {
        await router.push(asPath, asPath, { locale: lang }).then(onClose);
    };

    const toggleDarkMode: ChangeEventHandler<HTMLInputElement> = async () => {
        const newMode = user.user_settings.theme === 'dark' ? 'light' : 'dark';
        const body = {
            ...user.user_settings,
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

    return (
        <div className={styles.container}>
            <div className={styles.close_block}>
                <IoMdClose onClick={onClose} />
            </div>

            <div className={styles.content}>
                <div className={styles.user_block}>
                    <FaUserCircle className={styles.logo} />
                    <div className={styles.info_block}>
                        <p className={styles.name}>{user ? user.first_name : 'Войдите в аккаунт'}</p>
                        <p className={styles.email}>{user && user.email}</p>
                    </div>
                </div>

                <div className={styles.contacts}>
                    <FaPhone />
                    <div className={styles.list}>
                        {Object.values(market.contact_details).map((value) => (
                            <a
                                key={value}
                                href={`tel:${value}`}
                                className={styles.number}
                            >
                                {value}
                            </a>
                        ))}
                    </div>
                </div>

                <Link
                    className={styles.address}
                    href={`http://maps.google.com/?q=${market.address}`}
                    target='_blank'
                >
                    <FaLocationDot /> {market.address}
                </Link>

                <div className={styles.select}>
                    <IoLanguage />
                    <select
                        className={styles.toggle_translate}
                        value={locale}
                        onChange={(e) => {
                            const selectedLocale = e.target.value;
                            handleChangeLanguage(selectedLocale);
                        }}
                    >
                        <option value='en'>English</option>
                        <option value='ru'>Русский</option>
                    </select>
                </div>
                {user && (
                    <div className={styles.darkMode_block}>
                        <div className={styles.line} />
                        <p>Темная тема</p>

                        <label className={styles.switch}>
                            <input
                                type='checkbox'
                                checked={user.user_settings.theme === 'dark'}
                                onChange={toggleDarkMode}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                )}

                {!user && (
                    <div className={styles.logout_block}>
                        <Link
                            onClick={onClose}
                            className={styles.auth}
                            href={'/auth/login'}
                        >
                            <FiLogIn />
                            {t('login')}
                        </Link>
                    </div>
                )}

                {user && (
                    <div className={styles.logout}>
                        <button
                            onClick={() => {
                                onClose;
                                signOut();
                            }}
                        >
                            <RiLogoutBoxRLine className={styles.logo} />
                            Выйти
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
