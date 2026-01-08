import ProductGrid from '../../products/components/ProductGrid';
import Button from '@components/ui/Button.jsx';
import { ChevronDown } from 'lucide-react';
import { useCategorySection } from '../hooks/useCategorySection';
import { useLoadMoreCategorySection } from '../hooks/useLoadMoreCategorySection';

const CategorySection = () => {
    const { data: catSections } = useCategorySection();
    const { loadMore, isLoadingMore, variables } = useLoadMoreCategorySection();

    const loadingCategoryId = variables?.categoryId;
    const isLoadingMoreFor = (id) => isLoadingMore && loadingCategoryId === id;

    return (
        <div className='flex flex-col gap-2 bg-[#f6f6f6] inset-shadow-sm'>
            {catSections.map((cat) => {
                const remaining = cat.totalProducts - cat.products.length;

                return (
                    <section className='w-full bg-inherit' key={cat.id}>
                        <h2 className='p-3 text-lg font-semibold'>{cat.name}</h2>

                        <div className='w-full bg-white flex flex-col gap-5 items-center'>
                            <ProductGrid products={cat.products} className='grid-cols-5' />

                            {/* CHỈ HIỆN NÚT KHI CÒN SẢN PHẨM */}
                            {cat.nextOffset !== null && remaining > 0 && (
                                <div className='mb-5'>
                                    <Button
                                        variant='secondary'
                                        className='p-4'
                                        aria-label={`Xem thêm ${remaining} sản phẩm ${cat.name}`}
                                        endIcon={<ChevronDown />}
                                        onClick={() => loadMore(cat.id, cat.nextOffset)}
                                        disabled={isLoadingMoreFor(cat.id)}
                                    >
                                        <span className='font-normal'>
                                            Xem thêm {remaining} sản phẩm
                                        </span>
                                        <span className='font-semibold'>{cat.name}</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default CategorySection;
