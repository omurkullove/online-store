import styles from './Home.module.scss';
import { ICategoryApiResponse } from '@/interfaces/ICategory';
import 'swiper/css';
import Category from '../../Category/Category';
import Brand from '../../Brand/Brand';

const Home = ({ category_data }: { category_data: ICategoryApiResponse }) => {
    return (
        <div className={styles.container}>
            <Category data={category_data} />
            <div className={styles.double_container}>
                <Brand />
            </div>
        </div>
    );
};

export default Home;
