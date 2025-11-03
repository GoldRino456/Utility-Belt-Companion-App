import { useState, useEffect } from 'react';
import { Product, CollectionItem } from '../types';
import { products } from '../data/products';
import { getCollection, AddItemToCollection, RemoveItemFromCollection } from '../utils/storage';

interface UseCollectionReturn {
    allProducts: Product[];
    ownedProductIds: string[];
    isProductOwned: (productId: string) => boolean;
    toggleOwnership: (productId: string) => Promise<void>;
    ownedCount: number;
    totalCount: number;
    loading: boolean;
    error: string | null;
}

export function useCollection(): UseCollectionReturn {
    const [collection, setCollection] = useState<CollectionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadCollection();
    }, []);

    const loadCollection = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCollection();
            setCollection(data);
        }
        catch (error) {
            setError('Failed to load collection!');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    const toggleOwnership = async (productId: string) => {
        try {
            setError(null);

            if (isProductOwned(productId)) {
                await AddItemToCollection({ productId });
            }
            else {
                await RemoveItemFromCollection(productId);
            }

            await loadCollection();
        }
        catch (error) {
            setError('Failed to update product ownership.');
            console.error(error);
        }
    }

    const isProductOwned = (productId: string): boolean => {
        return collection.some(c => c.productId === productId);
    }

    const ownedProductIds = collection.map(c => c.productId);
    const ownedCount = ownedProductIds.length;
    const totalCount = products.length;

    return {
        allProducts: products,
        ownedProductIds,
        isProductOwned,
        toggleOwnership,
        ownedCount,
        totalCount,
        loading,
        error
    }
}