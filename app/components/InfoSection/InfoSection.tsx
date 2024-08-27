import React from 'react';
import styles from './InfoSection.module.scss';
import Image from 'next/image';

const InfoSection = () => {
    return (
        <div className={styles.container}>
            <div className={`${styles.item} ${styles.item1}`}>
                <Image
                    fill
                    src={'https://static.tildacdn.com/tild3538-6234-4866-a630-663664396231/__.png'}
                    style={{ objectFit: 'cover' }}
                    alt='image'
                />
            </div>
            <div className={`${styles.item} ${styles.item2}`}>
                <Image
                    fill
                    src={'https://static.tildacdn.com/tild6637-6130-4931-b238-633463633366/15_.png'}
                    style={{ objectFit: 'cover' }}
                    alt='image'
                />
            </div>
            <div className={`${styles.item} ${styles.item3}`}>
                <Image
                    fill
                    src={'https://static.tildacdn.com/tild3332-6234-4463-b730-643766363336/14_pro___.png'}
                    style={{ objectFit: 'cover' }}
                    alt='image'
                />
            </div>
            <div className={`${styles.item} ${styles.item4}`}>
                <Image
                    fill
                    src={'https://static.tildacdn.com/tild3039-6534-4639-b938-316564343139/15_15_pro_.png'}
                    style={{ objectFit: 'cover' }}
                    alt='image'
                />
            </div>
        </div>
    );
};

export default InfoSection;
