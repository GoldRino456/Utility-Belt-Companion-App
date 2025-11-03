import { CollectionItem } from '../../types';
import { collectionStore, StorageError } from './config';

export async function GetCollection(): Promise<CollectionItem[]> {
    try {
        const allCollectionItems: CollectionItem[] = [];
        await collectionStore.iterate((item: CollectionItem) => allCollectionItems.push(item));

        return allCollectionItems;
    }

    catch (error) {
        throw new StorageError('Failed to retrieve collection.', 'read', error);
    }
}

export async function AddItemToCollection(newItem: CollectionItem): Promise<void> {
    try {
        await collectionStore.setItem(newItem.productId, newItem);
    }
    catch (error) {
        throw new StorageError(`Failed to add product to collection with Id ${newItem.productId}`, 'write', error);
    }
}

export async function RemoveItemFromCollection(productId: string): Promise<void> {
    try {
        await collectionStore.removeItem(productId);
    }
    catch (error) {
        throw new StorageError(`Failed to remove product from collection with Id ${productId}.`, 'delete', error);
    }
}