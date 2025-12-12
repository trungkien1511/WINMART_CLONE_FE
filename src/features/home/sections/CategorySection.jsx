import ProductGrid from '../../products/components/ProductGrid';
import Button from '@components/ui/Button.jsx';
import { ChevronDown } from 'lucide-react';
import { useCategorySection } from '../hooks/useCategorySection';

const CategorySection = () => {
    const { data: catSections } = useCategorySection();

    return (
        <div className='flex flex-col gap-2 bg-[#f6f6f6] inset-shadow-sm'>
            {catSections.map((cat) => {
                return (
                    <section className='w-full bg-inherit' key={cat.id}>
                        <h2 className='p-3 text-lg font-semibold'>{cat.name}</h2>

                        <div className='w-full bg-white flex flex-col gap-5 items-center'>
                            <ProductGrid products={cat.products} />

                            <div className='mb-5'>
                                <Button
                                    variant='secondary'
                                    className='p-4'
                                    aria-label={`Xem thêm sản phẩm ${cat.name}`}
                                    endIcon={<ChevronDown />}
                                >
                                    <span className='font-normal'>Xem thêm xx sản phẩm </span>
                                    <span className='font-semibold'>{cat.name}</span>
                                </Button>
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default CategorySection;
