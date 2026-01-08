// CategoryMenu/useCategoryMenu.js
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import categoryService from '../apis/categoryService';

export const useCategoryMenu = () => {
    // Constants
    const SWITCH_DELAY = 100;
    const CLOSE_DELAY = 100;

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const switchTimeoutRef = useRef(null);
    const outTimeoutRef = useRef(null);

    const clearAllTimeouts = useCallback(() => {
        if (switchTimeoutRef.current) {
            clearTimeout(switchTimeoutRef.current);
            switchTimeoutRef.current = null;
        }
        if (outTimeoutRef.current) {
            clearTimeout(outTimeoutRef.current);
            outTimeoutRef.current = null;
        }
    }, []);

    // cleanup on unmount
    useEffect(() => {
        return clearAllTimeouts;
    }, [clearAllTimeouts]);

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await categoryService.getAll();
            return res.data;
        }
    });

    const handleMouseEnterCategory = useCallback(
        (category) => {
            clearAllTimeouts();

            const hasChildren = category.children?.length > 0;

            if (!hasChildren) {
                setIsOpenSubMenu(false);
                setHoveredCategory(null);
                return;
            }

            if (!isOpenSubMenu) {
                setHoveredCategory(category);
                setIsOpenSubMenu(true);
            } else {
                switchTimeoutRef.current = setTimeout(() => {
                    setHoveredCategory(category);
                }, SWITCH_DELAY);
            }
        },
        [isOpenSubMenu, clearAllTimeouts]
    );

    const handleMouseLeaveCategory = useCallback((category) => {
        if (switchTimeoutRef.current) {
            clearTimeout(switchTimeoutRef.current);
            switchTimeoutRef.current = null;
        }

        const hasChildren = category.children?.length > 0;

        if (!hasChildren) {
            outTimeoutRef.current = setTimeout(() => {
                setIsOpen(false);
            }, CLOSE_DELAY);
        }
    }, []);

    const handleMenuEnter = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleMenuLeave = useCallback(() => {
        clearAllTimeouts();
        setIsOpen(false);
        setIsOpenSubMenu(false);
        setHoveredCategory(null);
    }, [clearAllTimeouts]);

    const handleClickCategory = useCallback(() => {
        clearAllTimeouts?.(); // nếu có
        if (switchTimeoutRef.current) clearTimeout(switchTimeoutRef.current);
        if (outTimeoutRef.current) clearTimeout(outTimeoutRef.current);

        setIsOpen(false);
        setIsOpenSubMenu(false);
        setHoveredCategory(null);
    }, [clearAllTimeouts]);

    return {
        isOpen,
        isOpenSubMenu,
        categories,
        hoveredCategory,
        handleMenuEnter,
        handleMenuLeave,
        handleMouseEnterCategory,
        handleMouseLeaveCategory,
        handleClickCategory
    };
};
