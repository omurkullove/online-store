import styles from './Home.module.scss';
import { ICategoryApiResponse } from '@/interfaces/ICategory';
import 'swiper/css';
import Category from '../../Category/Category';

const Home = ({ data }: { data: ICategoryApiResponse }) => {
    return (
        <div className={styles.container}>
            <Category data={data} />
        </div>
    );
};

export default Home;
