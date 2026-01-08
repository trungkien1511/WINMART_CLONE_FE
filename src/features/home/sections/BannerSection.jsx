import React, { memo, useMemo, useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ==============================
// DATA
// ==============================
const BANNER_DATA = {
    mainSlides: [
        {
            id: 1,
            url: 'https://s3-hcmc02.higiocloud.vn/images/2025/10/home-page-867x400-20251024100157.jpg',
            alt: 'Banner khuyến mãi chính 1',
            link: '/promotion/sub-1'
        },
        {
            id: 2,
            url: 'https://s3-hcmc02.higiocloud.vn/images/2025/10/home-banner-online-wcm1-20251024105322.png',
            alt: 'Banner khuyến mãi chính 2',
            link: '/promotion/sub-1'
        },
        {
            id: 3,
            url: 'https://s3-hcmc02.higiocloud.vn/images/2025/10/group-16-20251023075535.jpg',
            alt: 'Banner khuyến mãi chính 3'
        },
        {
            id: 4,
            url: 'https://s3-hcmc02.higiocloud.vn/images/2025/10/home-page-867x400-20251024100157.jpg',
            alt: 'Banner khuyến mãi chính 4',
            link: '/promotion/sub-1'
        }
    ],
    subBanners: [
        {
            id: 1,
            url: 'https://s3-hcmc02.higiocloud.vn/images/2025/10/home-banner-online-wcm1-20251024105322.png',
            alt: 'Banner phụ 1',
            link: '/promotion/sub-1'
        },
        {
            id: 2,
            url: 'https://s3-hcmc02.higiocloud.vn/images/2025/10/group-16-20251023075535.jpg',
            alt: 'Banner phụ 2',
            link: '/promotion/sub-2'
        }
    ]
};

// ==============================
// SUB COMPONENTS
// ==============================
const MainSlider = memo(({ onClick }) => {
    const swiperConfig = useMemo(
        () => ({
            modules: [Navigation, Pagination, Autoplay],
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            navigation: true,
            pagination: {
                clickable: true,
                dynamicBullets: true
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false, // Thay đổi: cho phép autoplay tiếp tục sau tương tác
                pauseOnMouseEnter: true
            },
            speed: 600,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 1
            }
        }),
        []
    );

    return (
        <div className='relative w-full h-full overflow-hidden cursor-pointer'>
            <Swiper {...swiperConfig} className='w-full h-full'>
                {BANNER_DATA.mainSlides.map((slide, index) => (
                    <SwiperSlide key={slide.id} onClick={() => onClick(slide.link)}>
                        <img
                            src={slide.url}
                            alt={slide.alt}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            className='w-full h-full object-cover'
                            draggable={false}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <style>{`
            .swiper-button-prev,
            .swiper-button-next {
                position: absolute;
                top: 50%; 
                transform: translateY(-50%);
                color: #fff;
                background-color: #ed1c24;
                width: 20px;
                height: 40px;
                display: flex;             
                align-items: center;
                justify-content: center;
                z-index: 20;                
            }

            .swiper-button-prev {
                left: 0 !important;
                border-top-right-radius: 40px;
                border-bottom-right-radius: 40px;
                padding-right: 5px;
            }

            .swiper-button-next {
                right: 0 !important;
                border-top-left-radius: 40px;
                border-bottom-left-radius: 40px;
                padding-left: 5px
            }

            .swiper-button-next svg,
            .swiper-button-prev svg {
                width: 12px;
                height: 12px;
                stroke: #fff;
                stroke-width: 1px;
            }

            
            .swiper-pagination-bullet {
                background: #fff;
                opacity: 0.6;
                transition: opacity 0.3s;
            }
            .swiper-pagination-bullet:hover {
                opacity: 0.8;
            }
            .swiper-pagination-bullet-active {
                opacity: 1;
            }
        `}</style>
        </div>
    );
});
MainSlider.displayName = 'MainSlider';

const SubBanner = memo(({ banner, onClick }) => {
    return (
        <div
            onClick={() => onClick(banner.link)}
            role='button'
            tabIndex={0}
            className='cursor-pointer w-full h-full overflow-hidden '
        >
            <img
                src={banner.url}
                alt={banner.alt}
                loading='lazy'
                className='w-full h-full object-fill '
                draggable={false}
            />
        </div>
    );
});
SubBanner.displayName = 'SubBanner';

// ==============================
// MAIN COMPONENT
// ==============================
const Banner = () => {
    const [count, setCount] = useState(0);

    const handleBannerClick = useCallback((link) => {
        // Trong dự án thực tế, sử dụng router navigation
        // ví dụ: navigate(link) hoặc router.push(link)
        console.log('Navigate to:', link);
    }, []);

    return (
        <section className='max-w-full w-full mt-1'>
            {/* <button onClick={() => setCount(count + 1)}>Click</button> */}
            <div className='grid grid-cols-4 gap-1.5 '>
                {/* Left: Main Slider */}
                <div className='col-span-3 row-span-2  '>
                    <MainSlider onClick={handleBannerClick} />
                </div>

                {/* Right: Sub banners */}
                <div className='flex flex-col col-span-1 row-span-2 gap-1.5 '>
                    {BANNER_DATA.subBanners.map((banner) => (
                        <div key={banner.id} className='flex-1 min-h-0'>
                            <SubBanner banner={banner} onClick={handleBannerClick} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default memo(Banner);
