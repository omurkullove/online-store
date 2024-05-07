import Image from 'next/image';
import styles from './Header.module.scss';
import { CiSearch } from 'react-icons/ci';
import { FaLocationDot, FaPhone, FaUser } from 'react-icons/fa6';
import { IoLanguage } from 'react-icons/io5';
import { FiLogIn } from 'react-icons/fi';
import Link from 'next/link';
import ToggleLanguage from '../ToggleLanguage/ToggleLanguage';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import UserPopup from '../UserPopup/UserPopup';
import { IUserInfo } from '@/interfaces/IAuth';
import { VscMenu } from 'react-icons/vsc';
import Sidebar from '../Sidebar/Sidebar';

const Header = ({ user }: { user: IUserInfo }) => {
    const [isLangModal, setIsLangModal] = useState(false);
    const [isUserPopup, setIsUserPopup] = useState(false);
    const [isSidebar, setIsSidebar] = useState(false);

    const t = useTranslations('Header');
    const router = useRouter();
    const locale = useLocale();

    return (
        <>
            <motion.header
                className={styles.container}
                key={'header-framer'}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1, pointerEvents: 'all', transition: { duration: 1.5 } }}
            >
                <section className={styles.section_1}>
                    <div
                        className={styles.logo}
                        onClick={() => router.push('/')}
                    >
                        <Image
                            src={'/logo.png'}
                            width={80}
                            height={70}
                            alt='logo'
                        />
                        <p className={styles.title}>GLobal Joy</p>
                    </div>

                    <div className={styles.search_block}>
                        <input
                            type='text'
                            placeholder={t('search')}
                            className={styles.search}
                        />
                        <CiSearch className={styles.search_icon} />
                    </div>
                </section>
                <section className={styles.section_2}>
                    <div className={styles.block_1}>
                        <Link
                            href='tel:+996555784590'
                            className={styles.number}
                        >
                            <FaPhone />
                            +996555784590
                        </Link>
                        <Link
                            className={styles.address}
                            href={'http://maps.google.com/?q=Online Store  Киевская 78'}
                            target='_blank'
                        >
                            <FaLocationDot /> ул. Киевская 78 тц. Бишкек Парк
                        </Link>

                        <p
                            className={styles.toggle_translate}
                            onClick={() => setIsLangModal(true)}
                        >
                            <IoLanguage />
                            {locale === 'en' ? 'English' : 'Русский'}
                        </p>
                    </div>
                    <div className={styles.block_2}>
                        {user ? (
                            <p
                                className={styles.username}
                                onMouseEnter={() => setIsUserPopup(true)}
                                onMouseLeave={() => setIsUserPopup(false)}
                            >
                                <FaUser />

                                {user.display_name}
                            </p>
                        ) : (
                            <Link
                                className={styles.auth}
                                href={'/auth/login'}
                            >
                                <FiLogIn />
                                {t('login')}
                            </Link>
                        )}

                        <AnimatePresence>
                            {isUserPopup && user?.email && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ duration: 0.1, ease: 'linear' }}
                                    className={styles.popupMask}
                                    onMouseEnter={() => setIsUserPopup(true)}
                                    onMouseLeave={() => setIsUserPopup(false)}
                                >
                                    <UserPopup
                                        isOpen={isUserPopup}
                                        data={user}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <VscMenu
                        className={styles.burger}
                        onClick={() => setIsSidebar(true)}
                    />
                </section>
            </motion.header>
            <ToggleLanguage
                isOpen={isLangModal}
                onClose={() => setIsLangModal(false)}
            />

            <AnimatePresence>
                {isSidebar && (
                    <motion.div
                        initial={{ translateX: 100, opacity: 0 }}
                        animate={{
                            translateX: 0,
                            opacity: 1,
                        }}
                        exit={{ translateX: 100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={styles.sideBarMask}
                    >
                        <Sidebar
                            onClose={() => setIsSidebar(false)}
                            user={user}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
