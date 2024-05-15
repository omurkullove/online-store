import Image from 'next/image';
import styles from './Brand.module.scss';

const Brand = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                {/* <div className={styles.icon}>
                    <Image
                        src={
                            'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/apple-icon.png'
                        }
                        alt='icon'
                        layout='fill'
                        objectFit='cover'
                    />
                </div> */}

                <p className={styles.name}>Apple</p>
            </div>
        </div>
    );
};

export default Brand;
