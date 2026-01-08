import { useCallback, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Breadcrumb from '@components/common/Breadcrumb';
import ProductGrid from '../../products/components/ProductGrid';

import { useProductsByCategory } from '../../products/hooks/useProductCategory';
import { useCategoriesTree } from '../hooks/useCategoriesTree';

import CategorySidebar from '../components/category_page/CategorySidebar';
import CategoryToolbar from '../components/category_page/CategoryToolbar';

import { SORT_OPTIONS } from '../constants/sortOptions';
import { parseBrandsParam, buildBreadcrumbs } from '../utils/categoryHelper';
import { useBrandsByCategory } from '../hooks/useBrandsByCategory';

const CategoryPage = () => {
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    // Parse URL params
    const childSlug = searchParams.get('cate2');
    const brandsParam = searchParams.get('brands');
    const order = searchParams.get('order');

    // Memoized values
    const brands = useMemo(() => parseBrandsParam(brandsParam), [brandsParam]);

    const params = useMemo(() => ({ order, brands }), [order, brands]);

    const activeSlug = childSlug || slug;

    // Data fetching
    const { data: products } = useProductsByCategory({ activeSlug, params });
    const { data: categories } = useCategoriesTree(slug);
    const { data: brandList } = useBrandsByCategory(activeSlug);

    const breadCrumbs = useMemo(
        () => buildBreadcrumbs(categories, activeSlug),
        [categories, activeSlug]
    );

    // Event handlers
    const onCatClick = useCallback(
        (cat) => {
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                next.set('cate2', cat.slug);
                return next;
            });
        },
        [setSearchParams]
    );

    const onOrderClick = useCallback(
        (orderValue) => {
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev);

                if (next.get('order') === orderValue) {
                    next.delete('order');
                } else {
                    next.set('order', orderValue);
                }

                return next;
            });
        },
        [setSearchParams]
    );

    const onBrandClick = useCallback(
        (brand) => {
            setSearchParams((prev) => {
                const next = new URLSearchParams(prev);
                const current = next.get('brands');
                const currentBrands = current ? current.split(',').filter(Boolean) : [];
                const exists = currentBrands.includes(brand.slug);

                const updated = exists
                    ? currentBrands.filter((b) => b !== brand.slug)
                    : [...currentBrands, brand.slug];

                if (updated.length === 0) {
                    next.delete('brands');
                } else {
                    next.set('brands', updated.join(','));
                }

                return next;
            });
        },
        [setSearchParams]
    );

    return (
        <div className='flex bg-white min-h-screen'>
            <CategorySidebar
                categories={categories}
                brands={brandList}
                onCatClick={onCatClick}
                onBrandClick={onBrandClick}
                activeBrands={brands}
                activeCat={activeSlug}
            />
            <main className='flex-4'>
                <CategoryToolbar
                    sortOptions={SORT_OPTIONS}
                    onOrderClick={onOrderClick}
                    activeOrder={order}
                />
                <hr className='border-divider my-2' />
                <div className='mx-2.5 mt-2'>
                    <Breadcrumb className='mb-3' items={breadCrumbs} />
                    <ProductGrid products={products} className='grid-cols-4' />
                </div>
            </main>
        </div>
    );
};

export default CategoryPage;
