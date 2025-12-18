import { ChevronDown } from 'lucide-react';
import Breadcrumb from '@components/common/Breadcrumb';
import ProductGrid from '../../products/components/ProductGrid';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@components/ui/Button';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import categoryService from '@services/categoriesService';
import brandService from '@services/brandService';
import { useProductsByCategory } from '../hooks/useProductCategory';

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

    return (
        <div>
            <HeaderFilter title={title} expanded={isExpanded} onChange={setIsExpanded} />
            {isExpanded && (
                <div className='mx-2.5 mb-2.5 grid grid-cols-1 gap-2.5 text-sm'>
                    {items &&
                        items.map((cat) => {
                            return (
                                <Button
                                    key={cat.id}
                                    variant='header'
                                    onClick={() => onItemClick(cat)}
                                >
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

const CategorySidebar = memo(({ categories, brands, onCatClick }) => {
    return (
        <div className='flex flex-col flex-1 border-r border-divider '>
            <CategoryFilter
                title={categories.name}
                items={categories.children}
                onItemClick={onCatClick}
            />
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

const SORT_OPTIONS = [
    { value: 'best-deal', label: 'Khuyến mãi tốt nhất' },
    { value: 'best-selling', label: 'Bán chạy' }
];
const CategoryPage = () => {
    const { slug: parentSlug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const childSlug = searchParams.get('cate2');
    const activeSlug = childSlug || parentSlug;

    const { data: products } = useProductsByCategory(activeSlug, {
        enabled: !!activeSlug
    });

    const { data: categories } = useQuery({
        queryKey: ['category-children', parentSlug],
        queryFn: async () => {
            const res = await categoryService.getCategoriesTree(parentSlug);
            return res.data;
        },
        enabled: !!parentSlug,
        suspense: true
    });

    const { data: brands } = useQuery({
        queryKey: ['brands-by-category', parentSlug],
        queryFn: async () => {
            const res = await brandService.getBrandsByCat(parentSlug);
            return res.data;
        },
        enabled: !!parentSlug,
        suspense: true
    });

    const breadCrumbs = useMemo(() => {
        if (!categories) return [];

        const activeChild = categories.children?.find((c) => c.slug === activeSlug);

        return [
            { label: categories.name, to: `/categories/${categories.slug}` }, // Trang chủ / Sữa các loại
            { label: activeChild?.name } // / Sữa tươi (hoặc cat2)
        ];
    }, [categories, activeSlug]);

    const onCatClick = (cat) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set('cate2', cat.slug);
            return next;
        });
    };

    useEffect(() => {
        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev);
                next.delete('cate2');
                return next;
            },
            { replace: true }
        );
    }, [parentSlug]);

    return (
        <div className='flex bg-white min-h-screen'>
            <CategorySidebar categories={categories} brands={brands} onCatClick={onCatClick} />
            <main className='flex-4'>
                <CategoryToolbar sortOptions={SORT_OPTIONS} />
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
