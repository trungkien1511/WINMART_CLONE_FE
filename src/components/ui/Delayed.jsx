import { useEffect, useState } from 'react';

function Delayed({ children, ms = 200 }) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setShow(true), ms);
        return () => clearTimeout(t);
    }, [ms]);
    return show ? children : null;
}

export default Delayed;
