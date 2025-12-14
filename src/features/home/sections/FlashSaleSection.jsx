import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { useMemo } from 'react';
import ProductGrid from '@features/products/components/ProductGrid';
import PRODUCTS_DATA from '../../../app/data_temp';

const TIMER_INTERVAL = 1000; // 1 second

const formatTime = (time) => String(time).padStart(2, '0');

const calculateTimeLeft = (endTime) => {
    const now = Date.now();
    const difference = endTime - now;

    if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, isExpired: false };
};

const TimeBox = memo(({ value }) => (
    <div
        className={`bg-brand-primary text-white font-bold text-sm px-1.5 py-1 text-center shadow-md`}
        role='timer'
        aria-live='polite'
    >
        {formatTime(value)}
    </div>
));

TimeBox.displayName = 'TimeBox';

const FlashSaleCountdown = ({ targetHour = 0, onExpire, autoReset = true }) => {
    const [endTime, setEndTime] = useState(() => {
        const now = new Date();
        const target = new Date();
        target.setHours(targetHour, 0, 0, 0);

        if (now >= target) {
            target.setDate(target.getDate() + 1);
        }

        return target.getTime();
    });

    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endTime));

    // Reset countdown
    const resetCountdown = useCallback(() => {
        const now = new Date();
        const nextMidnight = new Date();
        nextMidnight.setHours(0, 0, 0, 0);
        nextMidnight.setDate(now.getDate() + 1);
        const newEndTime = nextMidnight.getTime();
        setEndTime(newEndTime);
        setTimeLeft(calculateTimeLeft(newEndTime));
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(endTime);
            setTimeLeft(newTimeLeft);

            // Xử lý khi hết giờ
            if (newTimeLeft.isExpired) {
                if (onExpire) {
                    onExpire();
                }
                if (autoReset) {
                    resetCountdown();
                } else {
                    clearInterval(timer);
                }
            }
        }, TIMER_INTERVAL);

        return () => clearInterval(timer);
    }, [endTime, onExpire, autoReset, resetCountdown]);

    const timerBoxes = useMemo(
        () => [
            {
                value: timeLeft.hours,
                label: 'Giờ'
            },
            {
                value: timeLeft.minutes,
                label: 'Phút'
            },
            {
                value: timeLeft.seconds,
                label: 'Giây'
            }
        ],
        [timeLeft]
    );

    return (
        <div
            className='w-full bg-linear-to-r from-[#ff3e34] to-[#ffcb42] px-4 py-3 shadow-lg rounded'
            role='banner'
            aria-label='Flash sale countdown'
        >
            <div className='mx-auto flex items-center justify-between '>
                <div className='flex items-center gap-3'>
                    <h2 className='text-white text-lg font-bold '>Duy nhất hôm nay</h2>
                </div>

                {/* Right side - Countdown */}
                <div className='flex items-center gap-1'>
                    <span className='text-white text-xs font-bold'>Kết thúc trong</span>
                    <div className='flex items-center gap-1.5 md:gap-2'>
                        {timerBoxes.map((box, index) => (
                            <TimeBox key={box.label} value={box.value} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FlashSale = () => {
    return (
        <section className='w-full flex flex-col gap-2'>
            <FlashSaleCountdown />
            <ProductGrid products={PRODUCTS_DATA} className='grid-cols-5' />
        </section>
    );
};

export default FlashSale;
