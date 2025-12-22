import ProductGrid from '../components/ProductGrid';
import Breadcrumb from '../../../components/common/Breadcrumb';
import ProductPriceSummary from '../components/ProductDetail/ProductPriceDetail';
import ProductVariantSelector from '../components/ProductDetail/ProductVariantSelector';
import { useMemo, useState } from 'react';
import QuantitySelector from '../components/ProductDetail/QualitySelector';
import AddToCartButton from '../components/ProductDetail/AddToCartButton';
import { useParams } from 'react-router-dom';
import product_temp from '@assets/images/product_temp.png';
import { useProductDetail } from '../hooks/useProductDetail';

const ProductDetail = () => {
    const { slug } = useParams();
    const { data: product } = useProductDetail(slug);
    const [selectedVariantId, setSelectedVariantId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    console.log(quantity);

    const variants = useMemo(() => {
        return product.productPackaging;
    }, [product]);

    const selectedVariant = useMemo(() => {
        return variants.find((v) => v.packagingTypeId === selectedVariantId) || variants[0] || null;
    }, [variants, selectedVariantId]);

    return (
        <div className='py-2'>
            <Breadcrumb
                className='mb-2'
                items={[{ label: 'Trang chủ', to: '/' }, { label: product.name }]}
            />

            <div className='flex bg-white '>
                <div className='max-w-112.5 w-full px-3.75 pb-13.75'>
                    <div className='flex items-center h-fit'>
                        <div className='pb-25'>
                            <img src={product_temp} alt='' />
                        </div>
                    </div>
                </div>
                <div className='max-w-2/3 w-full'>
                    <div className='flex flex-col px-3.75 py-7.5 text-foreground'>
                        <div className='mb-2.5'>
                            <div>
                                <h1 className='text-xl'>{product.name}</h1>
                            </div>
                            <div>
                                <span className='text-xs text-[#9999]'>SKU: {product.sku}</span>
                            </div>
                        </div>
                        <ProductPriceSummary
                            salePrice={selectedVariant.price}
                            originalPrice={selectedVariant.originalPrice}
                            inStock={selectedVariant.stock}
                            onSale={selectedVariant.onSale}
                        />
                        <ProductVariantSelector
                            variants={variants}
                            value={selectedVariantId} // truyền id (string)
                            setSelectedVariantId={setSelectedVariantId} // onChange trả về id
                        />

                        <QuantitySelector
                            value={quantity}
                            onChange={setQuantity}
                            max={selectedVariant.stockQuantity}
                        />
                        <div className='mt-6 w-50'>
                            <AddToCartButton quantity={quantity} />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    {product.relatedProducts.length > 0 && (
                        <>
                            <div className='px-4 py-3'>
                                <span>Sản phẩm liên quan</span>
                            </div>
                            <ProductGrid
                                products={product.relatedProducts}
                                className='grid-cols-5'
                            />
                        </>
                    )}
                </div>
            </div>

            <div></div>
        </div>
    );
};

export default ProductDetail;
