/**
 * Parse brands parameter từ URL
 * @param {string|null} brandsParam - Chuỗi brands từ URL params
 * @returns {string[]} Mảng brand slugs đã sort
 */
export const parseBrandsParam = (brandsParam) => {
    if (!brandsParam) return [];
    return brandsParam
        .split(',')
        .map((b) => b.trim())
        .filter(Boolean)
        .sort();
};

/**
 * Tạo breadcrumb items từ categories
 * @param {Object} categories - Category tree
 * @param {string} activeSlug - Slug đang active
 * @returns {Array} Breadcrumb items
 */
export const buildBreadcrumbs = (categories, activeSlug) => {
    if (!categories) return [];

    const items = [{ label: categories.name, to: `/categories/${categories.slug}` }];

    const activeChild = categories.children?.find((c) => c.slug === activeSlug);

    if (activeChild && activeChild.slug !== categories.slug) {
        items.push({ label: activeChild.name });
    }

    return items;
};
