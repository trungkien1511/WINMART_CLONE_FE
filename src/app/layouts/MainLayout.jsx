import Header from '@components/layouts/header';
import Footer from '@components/layouts/footer';

export default function MainLayout({ children }) {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />

            <main
                role='main'
                className='flex flex-1 justify-center bg-background-neutral transition-all duration-300'
            >
                <div className='flex flex-col w-full max-w-6xl mt-1 gap-2'>{children}</div>
            </main>

            <Footer />
        </div>
    );
}
