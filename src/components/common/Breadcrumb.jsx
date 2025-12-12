// components/common/Breadcrumb.jsx
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items, className = '' }) => {
    return (
        <nav className={`flex text-xs text-foreground ${className}`}>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={item.label}>
                        {index > 0 && <span className='mx-1'>/</span>}

                        {isLast || !item.to ? (
                            <span>{item.label}</span>
                        ) : (
                            <Link to={item.to}>{item.label}</Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
