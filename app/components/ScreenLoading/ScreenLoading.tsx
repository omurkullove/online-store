import React from 'react';
import styles from './ScreenLoading.module.scss';
import { ImSpinner2 } from 'react-icons/im';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const ScreenLoading = () => {
    const t = useTranslations();

    return (
        <motion.div
            className={styles.container}
            key={'screenLoading-framer'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p className={styles.title}>{t('screen_loading_title')}</p>

            <ImSpinner2 className={styles.loading} />
        </motion.div>
    );
};

export default ScreenLoading;
