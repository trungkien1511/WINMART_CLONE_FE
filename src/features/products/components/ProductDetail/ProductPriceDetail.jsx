// ProductPriceSummary.jsx

import { formatPrice } from '../../utils/formatPrice';

const ProductPriceSummary = ({ originalPrice, salePrice, inStock, onSale }) => {
    const showOriginal =
        onSale &&
        originalPrice != null &&
        salePrice != null &&
        Number(originalPrice) > Number(salePrice);

    return (
        <div className='p-2.5 bg-[url(https://winmart.vn/_next/static/images/bg-product-1fb6a3ec6319488c0e5d03e99a3500c4.jpg)]'>
            <div className='text-xs/[1.5rem]'>
                {showOriginal && (
                    <div className='flex w-full'>
                        <div className='basis-1/4'>
                            <span>Giá niêm yết</span>
                        </div>
                        <div className='basis-3/4'>
                            <del>{formatPrice(originalPrice)} ₫</del>
                        </div>
                    </div>
                )}

                <div className='flex w-full'>
                    <div className='basis-1/4'>
                        <span>{showOriginal ? 'Giá khuyến mại' : 'Giá bán lẻ'}</span>
                    </div>
                    <div className='basis-3/4'>
                        <span className='text-brand-primary text-base'>
                            {formatPrice(salePrice)} ₫
                        </span>
                    </div>
                </div>

                <div className='flex w-full py-2.5'>
                    <div className='basis-1/4'>
                        <span>Tình trạng</span>
                    </div>
                    <div className='basis-3/4'>
                        <span className='text-sm'>{inStock ? 'Còn hàng' : 'Hết hàng'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPriceSummary;
