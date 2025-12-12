import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, MessageCircle } from 'lucide-react';

import winmartLogo from '@assets/icons/whiteLogo.svg';
import boCongthuongLogo from '@assets/images/bocongthuong.png';

// ==============================
// CONSTANTS
// ==============================
const FOOTER_DATA = {
    aboutUs: {
        title: 'Về chúng tôi',
        links: [
            { label: 'Giới thiệu về WinMart', to: '/about' },
            { label: 'Danh sách cửa hàng', to: '/stores' },
            { label: 'Quản lý chất lượng', to: '/quality' },
            { label: 'Chính sách bảo mật', to: '/privacy' },
            { label: 'Điều khoản và điều kiện giao dịch', to: '/terms' }
        ]
    },
    support: {
        title: 'Hỗ trợ khách hàng',
        links: [
            { label: 'Trung tâm hỗ trợ khách hàng', to: '/support-center' },
            { label: 'Chính sách giao hàng', to: '/delivery-policy' },
            { label: 'Chính sách thanh toán', to: '/payment-policy' },
            { label: 'Chính sách đổi trả', to: '/return-policy' },
            { label: 'Đánh giá góp ý', to: '/feedback' },
            { label: 'Danh sách trúng thưởng', to: '/winners' }
        ]
    },
    contact: {
        title: 'Chăm sóc khách hàng',
        phone: '0247 1066866',
        email: 'cskh@winmart.masangroup.com'
    },
    company: {
        name: 'Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce',
        registration:
            'Mã số doanh nghiệp: 0104918404 Đăng ký lần đầu ngày 20 tháng 09 năm 2010, đăng ký thay đổi lần thứ 48, ngày 30 tháng 06 năm 2023'
    }
};

const SOCIAL_LINKS = [
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/winmart', bg: 'bg-[#1877F2]' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/winmart', bg: 'bg-[#FF0000]' },
    { icon: MessageCircle, label: 'Messenger', href: 'https://m.me/winmart', bg: 'bg-[#3171F6]' }
];

const ADDRESSES = [
    {
        title: 'Địa chỉ giao dịch Hà Nội:',
        company: FOOTER_DATA.company.name,
        address:
            'Tầng 6, Toà nhà trung tâm Quốc tế, số 17 Ngô Quyền, Phường Tràng Tiền, Quận Hoàn Kiếm, Thành Phố Hà Nội'
    },
    {
        title: 'Trụ sở chính:',
        company: FOOTER_DATA.company.name,
        address: 'Số 23 Lê Duẩn, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam'
    },
    {
        title: 'Địa chỉ giao dịch Tp.HCM:',
        company: FOOTER_DATA.company.name,
        address:
            'Tầng 12, Toà nhà Mplaza SaiGon, số 39 Lê Duẩn, Phường Bến Nghé, Quận 1, TP Hồ Chí Minh, Việt Nam'
    }
];

// ==============================
// SUB COMPONENTS
// ==============================
const FooterColumn = memo(({ title, links }) => (
    <div>
        <h3 className='text-xxs font-bold text-muted-foreground mb-2'>{title}</h3>
        <nav className='flex flex-col gap-1'>
            {links.map((l) => (
                <Link
                    key={l.to}
                    to={l.to}
                    className='text-xxs text-gray-100 hover:text-primary transition-colors '
                >
                    {l.label}
                </Link>
            ))}
        </nav>
    </div>
));

FooterColumn.propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired
        })
    ).isRequired
};

const SocialMediaLinks = memo(() => (
    <div className='flex flex-col gap-0.5'>
        <h3 className='text-xxs font-bold text-textSecondary'>Kết nối với chúng tôi</h3>
        <div className='flex items-center gap-2'>
            {SOCIAL_LINKS.map(({ icon: Icon, label, href, bg }) => (
                <a
                    key={label}
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={label}
                    className={`${bg} w-8 h-8 flex items-center justify-center rounded-full text-white hover:opacity-80 transition`}
                >
                    <Icon className='w-4 h-4' />
                </a>
            ))}
        </div>
    </div>
));

const AddressCard = memo(({ title, company, address }) => (
    <div className='flex flex-col bg-[#8c8c8c1a] p-4 rounded-md mt-2 gap-3'>
        <h4 className='text-md font-bold text-textSecondary'>{title}</h4>
        <div className='text-xxs text-white'>
            <p>{company}</p>
            <p>{address}</p>
        </div>
    </div>
));

AddressCard.propTypes = {
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
};

const CompanyInfo = memo(() => (
    <div className='flex flex-col items-start gap-2'>
        <img src={winmartLogo} alt='WinMart Logo' className='h-10 object-contain' />
        <p className='text-xxs text-white tracking-normal'>{FOOTER_DATA.company.name}</p>
        <p className='text-xxs text-white'>{FOOTER_DATA.company.registration}</p>
        <img
            src={boCongthuongLogo}
            alt='Bộ Công Thương Logo'
            loading='lazy'
            className='h-10 mt-2 cursor-pointer object-contain'
            onClick={() => window.open('http://online.gov.vn', '_blank')}
        />
    </div>
));

const ContactInfo = memo(() => (
    <div className='flex flex-col gap-2'>
        <div>
            <h3 className='text-xxs font-bold text-textSecondary mb-1'>
                {FOOTER_DATA.contact.title}
            </h3>
            <p className='text-xxs text-white'>Mua Online: {FOOTER_DATA.contact.phone}</p>
            <p className='text-xxs text-white'>Email: {FOOTER_DATA.contact.email}</p>
        </div>
        <SocialMediaLinks />
    </div>
));

const Footer = () => {
    return (
        <footer className='bg-footer text-white text-caption py-8'>
            <div className='max-w-6xl mx-auto '>
                {/* Top Section */}
                <div className='grid grid-cols-4 gap-6 mb-8 '>
                    <CompanyInfo />
                    <FooterColumn {...FOOTER_DATA.aboutUs} />
                    <FooterColumn {...FOOTER_DATA.support} />
                    <ContactInfo />
                </div>

                {/* Address Section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {ADDRESSES.map((addr) => (
                        <AddressCard key={addr.title} {...addr} />
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);
