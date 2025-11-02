import localforage from 'localforage';

export const collectionStore = localforage.createInstance({
    name: 'UtilityBeltCompanionApp',
    storeName: 'collection',
    description: 'Owned products'
});

export const gamesStore = localforage.createInstance({
    name: 'UtilityBeltCompanionApp',
    storeName: 'games',
    description: 'Game log entries'
});

export const achievementsStore = localforage.createInstance({
    name: 'UtilityBeltCompanionApp',
    storeName: 'achievements',
    description: 'Achievement progress'
});

export const settingsStore = localforage.createInstance({
    name: 'UtilityBeltCompanionApp',
    storeName: 'collection',
    description: 'User settings'
});

export function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export class StorageError extends Error {
    constructor(
        message: string,
        public operation: 'read' | 'write' | 'delete',
        public originalError?: unknown
    ) {
        super(message);
        this.name = 'StorageError';
    }
}