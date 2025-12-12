// features/products/components/ProductVariantSelector.jsx
import Button from '../../../../components/ui/Button';
const ProductVariantSelector = ({ variants, value, setSelectedVariantId }) => {
    return (
        <div className='pt-5 pb-2.5 text-xs/[1.5rem]'>
            <div className='flex w-full'>
                <div className='basis-1/4 pl-2.5'>
                    <span>Chọn loại</span>
                </div>
                <div className='basis-3/4'>
                    <div className='flex gap-1'>
                        {variants.map((variant) => (
                            <Button
                                key={variant.packagingTypeId}
                                type='button'
                                className='px-[15px] py-[5px] rounded-none'
                                variant={
                                    value === variant.packagingTypeId ? 'primary' : 'secondary'
                                }
                                onClick={() => setSelectedVariantId(variant.packagingTypeId)}
                            >
                                {variant.packagingTypeName}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductVariantSelector;
