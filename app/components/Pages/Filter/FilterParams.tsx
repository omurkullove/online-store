import { ChangeEvent, useState } from 'react';
import styles from './Filter.module.scss';
import { numCorrecter, translated } from '@/app/utils/helpers';
import { ICategoryApiResponse, ICategoryItem } from '@/interfaces/ICategory';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IProductApiResponse } from '@/interfaces/IProduct';
import { IBrandApiResponse, IBrandItem } from '@/interfaces/IBrand';
import brandService from '@/app/services/brandService';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ImSpinner2 } from 'react-icons/im';
import { FaQuestion } from 'react-icons/fa6';

interface IFilterParams {
    min?: number | undefined;
    max?: number | undefined;
    brand_id?: string | undefined;
    available_only?: boolean;
}

interface IFilterProps {
    product_data: IProductApiResponse;
    brand_data: IBrandApiResponse;
    category: ICategoryItem;
    brand: IBrandItem;
}

const Filter = ({ brand_data, product_data, category, brand }: IFilterProps) => {
    const locale = useLocale();
    const router = useRouter();
    const { query } = router;
    const { filter }: any = query;

    const [params, setParams] = useState<IFilterParams>({ max: 50000, min: 0, brand_id: brand ? brand.id : undefined });

    // brand-pagination states
    const [list, setList] = useState(brand_data.items);
    const [page, setPage] = useState(brand_data.page);

    const handleUpdateParams = (event: ChangeEvent<HTMLInputElement>, brand_id?: string) => {
        let key = event.target.name;
        let value: string | undefined | boolean = event.target.value;

        if (brand_id) {
            value = brand_id;

            if (params.brand_id == brand_id) {
                value = undefined;
            }
        }

        if (key == 'available_only') {
            value = event.target.checked;
        }

        setParams((prev) => ({ ...prev, [key]: value }));

        console.log(params);
    };

    const handleFetchNewBrands = () => {
        setTimeout(async () => {
            const res = await brandService.GET(String(page + 1), 'paginated');
            const data = res.items;
            setList((prev) => [...prev, ...data]);
            setPage((prev) => prev + 1);
        }, 2000);
    };

    const handleActivateParams = () => {
        console.log(params);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.category_title}>
                    {category
                        ? translated('title', category.translate_content, locale)
                        : translated('name', brand.translate_content, locale)}
                </h1>

                <div className={styles.input_block}>
                    <input
                        className={styles.search}
                        placeholder='Поиск товаров...'
                    />
                    <select
                        name='sort'
                        className={styles.select}
                    >
                        <option value='default'>Порядок: по умолчанию</option>
                        <option value='price_up'>Цена: по возрастанию</option>
                        <option value='price_down'>Цена: по убыванию</option>
                        <option value='new_first'>Порядок: сперва новые</option>
                        <option value='old_first'>Порядок: сперва старые</option>
                    </select>
                </div>
            </div>

            <div className={styles.block}>
                <div className={styles.filter_block}>
                    <div className={styles.price_block}>
                        <p className={styles.title}>Цена</p>
                        <div className={styles.range_block}>
                            <div className={styles.range_item}>
                                <p className={styles.title}>От</p>
                                <input
                                    onChange={handleUpdateParams}
                                    placeholder='Oт'
                                    type='range'
                                    name='min'
                                    min={0}
                                    max={100000}
                                    value={params.min}
                                />
                                <p className={styles.value}>{numCorrecter(params.min ?? 0)}</p>
                            </div>

                            <div className={styles.range_item}>
                                <p className={styles.title}>До</p>
                                <input
                                    formNoValidate={true}
                                    onChange={handleUpdateParams}
                                    placeholder='До'
                                    type='range'
                                    min={0}
                                    max={1000000}
                                    value={params.max}
                                    name='max'
                                />
                                <p className={styles.value}>{numCorrecter(params.max ?? 0)}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.brand_block}>
                        <p className={styles.title}>Бренд</p>

                        <div
                            className={styles.brand_list}
                            id='brand-filter-container'
                        >
                            <InfiniteScroll
                                className={styles.scroll}
                                dataLength={list.length}
                                next={handleFetchNewBrands}
                                hasMore={list.length != brand_data.total}
                                scrollableTarget={'brand-filter-container'}
                                loader={<ImSpinner2 className={styles.loading} />}
                            >
                                {list.map((brand_item) => (
                                    <label
                                        className={styles.checkbox_container}
                                        key={brand_item.id}
                                    >
                                        <input
                                            type='checkbox'
                                            name={'brand_id'}
                                            checked={params.brand_id === brand_item.id}
                                            onChange={(event) => handleUpdateParams(event, brand_item.id)}
                                        />
                                        <span className={styles.checkMark}></span>
                                        {translated('name', brand_item.translate_content, locale)}
                                    </label>
                                ))}
                            </InfiniteScroll>
                        </div>

                        <div className={styles.buttons}>
                            <button onClick={() => setParams({})}>Сброс</button>
                            <button onClick={handleActivateParams}>Поиск</button>
                        </div>
                    </div>
                </div>
                <div className={styles.product_list}>
                    {product_data.items.length ? (
                        product_data.items.map((item) => <div>{item.id}</div>)
                    ) : (
                        <div className={styles.noData_block}>
                            <FaQuestion className={styles.icon} />
                            <p className={styles.text}>
                                По результатам поиска ничего не найдено, попробуйте изменить фильтр
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filter;
