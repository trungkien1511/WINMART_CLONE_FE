import { memo } from 'react';
import { Link } from 'react-router-dom';

// Memoized SubMenu component
const SubMenu = memo(({ category, onClick }) => {
    if (!category?.children?.length) return null;

    return (
        <div className='basis-5/6 flex'>
            <div className='w-2 h-full bg-gray-200' />
            <div className='bg-white'>
                <div className='flex px-2'>
                    <ul className='flex flex-col flex-1'>
                        {category.children.map((child) => (
                            <li key={child.id} className='h-10 flex items-center'>
                                <Link to={`/categories/${child.slug}`} onClick={onClick}>
                                    <span className='text-sm font-bold'>{child.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className='flex-1 pt-5'>
                        <img
                            src={
                                category.imageUrl ||
                                'https://s3-hcmc02.higiocloud.vn/images/2025/02/nuoc-giat-20250211153204.png'
                            }
                            alt={category.name}
                            className='w-full h-full object-cover'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

SubMenu.displayName = 'SubMenu';

export default SubMenu;
