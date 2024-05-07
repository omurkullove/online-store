import React from 'react';
import { motion } from 'framer-motion';
import styles from './ToggleLanguage.module.scss';
import { useRouter } from 'next/router';

interface IToggleLanguageProps {
    onClose: () => void;
    isOpen: boolean;
}

const ToggleLanguage = ({ isOpen, onClose }: IToggleLanguageProps) => {
    const router = useRouter();
    const { pathname } = router;

    const handleChangeLanguage = async (lang: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        await router.push(pathname, pathname, { locale: lang }).then(onClose);
    };

    return (
        isOpen && (
            <motion.div
                key={'language-framer'}
                initial={{ opacity: 0.5 }}
                animate={{
                    opacity: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.229)',
                    transition: { duration: 0.3, ease: 'linear' },
                }}
                className={styles.container}
                onClick={onClose}
            >
                <div
                    className={styles.modal}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3>Choose language:</h3>

                    <div className={styles.language_list}>
                        <button
                            className={`${styles.item} ${router.locale === 'ru' && styles.active}`}
                            onClick={(e) => handleChangeLanguage('ru', e)}
                        >
                            Русский
                        </button>
                        <button
                            className={`${styles.item} ${router.locale === 'en' && styles.active}`}
                            onClick={(e) => handleChangeLanguage('en', e)}
                        >
                            English
                        </button>
                    </div>
                </div>
            </motion.div>
        )
    );
};

export default ToggleLanguage;
