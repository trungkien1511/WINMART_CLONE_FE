import { ChevronDown } from 'lucide-react';
import Breadcrumb from '@components/common/Breadcrumb';
import ProductGrid from '../../products/components/ProductGrid';
import data_temp from '@app/data_temp';
import { memo, useCallback, useState } from 'react';
import Button from '@components/ui/Button';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import productService from '@services/productService';
import categoryService from '@services/categoriesService';
import brandService from '@services/brandService';

const HeaderFilter = memo(({ title, onChange, expanded }) => {
    return (
        <>
            <button
                className='w-full mt-2 px-2.5 py-1.75 flex justify-between items-center'
                onClick={() => onChange(!expanded)}
            >
                <span className='text-sm'>{title}</span>

                <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                />
            </button>
        </>
    );
});
const CategoryFilter = memo(({ title, items, onItemClick }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleItemClick = useCallback(
        (category) => {
            if (onItemClick) {
                onItemClick(category);
            }
        },
        [onItemClick]
    );

    return (
        <div>
            <HeaderFilter title={title} expanded={isExpanded} onChange={setIsExpanded} />
            {isExpanded && (
                <div className='mx-2.5 mb-2.5 grid grid-cols-1 gap-2.5 text-sm'>
                    {items &&
                        items.map((cat) => {
                            return (
                                <Button key={cat.id} variant='header' onClick={() => cat}>
                                    <span className='text-xs text-foreground font-light'>
                                        {cat.name}
                                    </span>
                                </Button>
                            );
                        })}
                </div>
            )}
        </div>
    );
});

const BrandFilter = memo(({ title, items, className, onBrandClick }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleBrandClick = useCallback(
        (brand) => {
            if (onBrandClick) {
                onBrandClick(brand);
            }
        },
        [onBrandClick]
    );

    return (
        <div>
            <HeaderFilter title={title} expanded={isExpanded} onChange={setIsExpanded} />
            {isExpanded && (
                <div className={`mx-2.5 mb-2.5 grid gap-2.5 ${className}`}>
                    {Array.isArray(items) &&
                        items.map((brand, index) => {
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleBrandClick(brand)}
                                    type='button'
                                    aria-label={`Lọc theo thương hiệu ${brand.name}`}
                                >
                                    <div className='w-full h-full'>
                                        <img src={brand.logoUrl} alt='' />
                                    </div>
                                </button>
                            );
                        })}
                </div>
            )}
        </div>
    );
});

const CategorySidebar = memo(({ categories, brands }) => {
    console.log('brands type:', typeof brands, 'isArray:', Array.isArray(brands), brands);

    return (
        <div className='flex flex-col flex-1 border-r border-divider '>
            <CategoryFilter title={'Sữa các loại'} items={categories} />
            <hr className='border-divider' />
            <BrandFilter title='Thương hiệu' items={brands} className={'grid-cols-2'} />
        </div>
    );
});

const CategoryToolbar = memo(({ sortOptions }) => {
    return (
        <div className='flex gap-2 mt-2.5 ml-2.5'>
            {sortOptions.map((option) => (
                <Button key={option.value} variant='header'>
                    {option.label}
                </Button>
            ))}
        </div>
    );
});
const category_item = [
    {
        id: 1,
        catName: 'Sữa tươi'
    },
    {
        id: 2,
        catName: 'Sữa chua'
    }
];

const brand_item = [
    {
        id: 1,
        brandName: 'Anchor',
        imgLink: 'https://cdn-crownx.winmart.vn/images/prod/anchor.png'
    },
    {
        id: 2,
        brandName: 'Anchor',
        imgLink: 'https://cdn-crownx.winmart.vn/images/prod/anchor.png'
    }
];

const SORT_OPTIONS = [
    { value: 'best-deal', label: 'Khuyến mãi tốt nhất' },
    { value: 'best-selling', label: 'Bán chạy' }
];
const CategoryPage = () => {
    const { slug } = useParams();

    const { data: products } = useQuery({
        queryKey: ['product', slug], // Cache key
        queryFn: async () => {
            const res = await productService.getProductsByCategoryPath(slug);
            return res.data;
        },
        enabled: !!slug,
        suspense: true
    });

    const { data: categories } = useQuery({
        queryKey: ['category', slug],
        queryFn: async () => {
            const res = await categoryService.getCategoriesChild(slug);
            return res.data;
        },
        enabled: !!slug,
        suspense: true
    });

    const { data: brands } = useQuery({
        queryKey: ['brand', slug],
        queryFn: async () => {
            const res = await brandService.getBrandsByCat(slug);
            return res.data;
        },
        enabled: !!slug,
        suspense: true
    });

    return (
        <div className='flex bg-white min-h-screen'>
            <CategorySidebar categories={categories} brands={brands} />
            <main className='flex-4'>
                <CategoryToolbar sortOptions={SORT_OPTIONS} />
                <hr className='border-divider my-2' />
                <div className='mx-2.5 mt-2'>
                    <Breadcrumb
                        className='mb-3'
                        items={[
                            {
                                to: '/',
                                label: 'Trang chủ'
                            },
                            {
                                label: 'Sữa các loại'
                            }
                        ]}
                    />
                    <ProductGrid products={products} className='grid-cols-4' />
                </div>
            </main>
        </div>
    );
};

export default CategoryPage;
