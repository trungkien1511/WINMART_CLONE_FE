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
                                key={variant.productPackagingId}
                                type='button'
                                className='px-3.75 py-3.75 rounded-none'
                                variant={
                                    value === variant.productPackagingId ? 'primary' : 'secondary'
                                }
                                onClick={() => setSelectedVariantId(variant.productPackagingId)}
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
