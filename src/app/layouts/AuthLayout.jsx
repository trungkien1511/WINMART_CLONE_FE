import { ArrowLeft, House } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@assets/icons/redLogo.svg';

export default function AuthLayout({ children }) {
    return (
        <main className='bg-[#f0f8ff] flex justify-center min-h-screen'>
            <div className='flex flex-col items-center bg-white max-w-105 w-full p-8'>
                {/* Header */}
                <div className='w-full flex justify-between items-center'>
                    <Link to='/' className='p-2'>
                        <ArrowLeft className='w-6 h-6 text-gray-600' />
                    </Link>

                    <div className='h-11'>
                        <img
                            src={logo}
                            alt='WinMart Logo'
                            className='h-full w-auto object-contain'
                            loading='eager'
                        />
                    </div>

                    <Link to='/' className='p-2'>
                        <House className='w-6 h-6 text-gray-600' />
                    </Link>
                </div>

                {/* Nội dung */}
                {children}
            </div>
        </main>
    );
}
