import { useState, useMemo } from 'react';
import { useCollection } from '../hooks/useCollection';
import ProductCard from '../components/collection/ProductCard';
import { ProductType } from '../types';
import { products } from '../data/products';

type SortOption = 'name' | 'date' | 'type';

function Collection() {
    const {
        allProducts,
        isProductOwned,
        toggleOwnership,
        ownedCount,
        totalCount,
        loading,
        error
    } = useCollection();

    const [sortBy, setSortBy] = useState<SortOption>('type');
    const [filterType, setFilterType] = useState<ProductType | 'all'>('all');
    const [showOwnedOnly, setShowOwnedOnly] = useState(false);

    const displayedProducts = useMemo(() => {
        let filtered = allProducts;

        if (filterType !== 'all') {
            filtered = filtered.filter(p => p.type === filterType);
        }

        if (showOwnedOnly) {
            filtered = filtered.filter(p => isProductOwned(p.id));
        }

        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'date':
                    return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
                case 'type':
                    if (a.type !== b.type) {
                        return a.type.localeCompare(b.type);
                    }
                    return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
                default:
                    return 0;
            }
        });

        return sorted;
    }, [allProducts, filterType, showOwnedOnly, sortBy, isProductOwned]);

    const groupedProducts = useMemo(() => {
        const groups = new Map<ProductType, typeof displayedProducts>();
        displayedProducts.forEach(product => {
            if (!groups.has(product.type)) {
                groups.set(product.type, []);
            }
            groups.get(product.type)!.push(product);
        });

        return groups;
    }, [displayedProducts]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-gray-600">Loading collection...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-300 rounded-lg p-6">
                <h3 className="text-red-800 font-semibold mb-2">Error Loading Collection</h3>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Collection Manager</h2>
                        <p className="text-gray-600 mt-1">
                            Select which Marvel Champions products you own
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600">
                            {ownedCount} / {totalCount}
                        </div>
                        <div className="text-sm text-gray-600">products owned</div>
                    </div>
                </div>
            </div>

            {/* Filters and Sort */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Sort By */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="type">Product Type</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="date">Release Date</option>
                        </select>
                    </div>

                    {/* Filter by Type */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Filter by Type
                        </label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as ProductType | 'all')}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Types</option>
                            <option value={ProductType.CORE_SET}>Core Set</option>
                            <option value={ProductType.HERO_PACK}>Hero Packs</option>
                            <option value={ProductType.SCENARIO_PACK}>Scenario Packs</option>
                            <option value={ProductType.CAMPAIGN_BOX}>Campaign Boxes</option>
                        </select>
                    </div>

                    {/* Show Owned Only */}
                    <div className="flex-1 flex items-end">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showOwnedOnly}
                                onChange={(e) => setShowOwnedOnly(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Show owned only
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Product List */}
            {displayedProducts.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
                    No products found with the current filters.
                </div>
            ) : sortBy === 'type' ? (
                // Grouped by type
                <div className="space-y-6">
                    {Array.from(groupedProducts.entries()).map(([type, products]) => (
                        <div key={type}>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 px-2">
                                {type}
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    ({products.filter(p => isProductOwned(p.id)).length} / {products.length} owned)
                                </span>
                            </h3>
                            <div className="space-y-3">
                                {products.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        isOwned={isProductOwned(product.id)}
                                        onToggleOwnership={toggleOwnership}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Flat list (when not sorting by type)
                <div className="space-y-3">
                    {displayedProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isOwned={isProductOwned(product.id)}
                            onToggleOwnership={toggleOwnership}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Collection;