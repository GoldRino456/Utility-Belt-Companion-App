import localforage from 'localforage';

const localDbName = 'UtilityBeltCompanionApp';

export const collectionStore = localforage.createInstance({
    name: localDbName,
    storeName: 'collection',
    description: 'Owned products'
});

export const gamesStore = localforage.createInstance({
    name: localDbName,
    storeName: 'games',
    description: 'Game log entries'
});

export const achievementsStore = localforage.createInstance({
    name: localDbName,
    storeName: 'achievements',
    description: 'Achievement progress'
});

export const settingsStore = localforage.createInstance({
    name: localDbName,
    storeName: 'settings',
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