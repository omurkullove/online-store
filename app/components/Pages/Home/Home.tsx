import styles from './Home.module.scss';
import { ICategoryApiResponse } from '@/interfaces/ICategory';
import 'swiper/css';
import Category from '../../Category/Category';
import Brand from '../../Brand/Brand';
import { IBrandApiResponse } from '@/interfaces/IBrand';

const Home = ({
    category_data,
    brand_data,
}: {
    category_data: ICategoryApiResponse;
    brand_data: IBrandApiResponse;
}) => {
    return (
        <div className={styles.container}>
            <Category data={category_data} />
            <div className={styles.double_container}>
                <Brand data={brand_data} />
                <div className={styles.info_section}>GlobalJoy</div>
            </div>
        </div>
    );
};

export default Home;
