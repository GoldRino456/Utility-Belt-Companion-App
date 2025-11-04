import { CollectionItem } from '../../types';
import { collectionStore, StorageError } from './config';

export async function getCollection(): Promise<CollectionItem[]> {
    try {
        const allCollectionItems: CollectionItem[] = [];
        await collectionStore.iterate(function(value) {
            allCollectionItems.push(value as CollectionItem);
        });

        return allCollectionItems;
    }

    catch (error) {
        throw new StorageError('Failed to retrieve collection.', 'read', error);
    }
}

export async function clearCollection() {
    try {
        await collectionStore.clear();
    }
    catch (error) {
        throw new StorageError('Failed to clear collection.', 'delete', error);
    }
}

export async function saveCollection(collection: CollectionItem[]) {
    try {
        for (const elem of collection) {
            await collectionStore.setItem(elem.productId, elem);
        }
    } catch (error) {
        throw new StorageError('Failed to save collection.', 'write', error);
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