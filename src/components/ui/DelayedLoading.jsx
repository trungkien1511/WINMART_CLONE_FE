import { useState, useEffect } from 'react';
import { CircularLoading } from 'respinner';

const DelayedLoading = ({ delay = 300 }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    // Không hiển thị gì trong 300ms đầu
    if (!show) return null;

    // Sau 300ms mới hiển thị loading với fade-in
    return (
        <>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .fade-in {
                    animation: fadeIn 0.3s ease-in;
                }
            `}</style>
            <div className='min-h-[60vh] flex items-center justify-center fade-in'>
                <CircularLoading color='#ef4444' size={64} stroke={4} />
            </div>
        </>
    );
};

export default DelayedLoading;
