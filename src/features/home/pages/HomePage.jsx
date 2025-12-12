// src/pages/Home/index.jsx
import BannerSection from '../sections/BannerSection';
import FlashSaleSection from '../sections/FlashSaleSection';
import CategorySection from '../sections/CategorySection';

export default function Home() {
    return (
        <>
            <BannerSection />
            <FlashSaleSection />
            <CategorySection />
        </>
    );
}
