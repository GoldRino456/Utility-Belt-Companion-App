import { GameLog } from '../../types';
import { gamesStore, generateId, StorageError } from './config';

export async function getAllGames(): Promise<GameLog[]> {
    try {
        const allGames: GameLog[] = [];
        await gamesStore.iterate((gameLog: GameLog) => allGames.push(gameLog));

        return allGames;
    }
    catch (error) {
        throw new StorageError('Failed to retrieve game logs.', 'read', error);
    }
}

export async function getGameById(id: string): Promise<GameLog> {
    try {
        const existingGame = await gamesStore.getItem<GameLog>(id);

        if (!existingGame) {
            throw new Error(`Game with id ${id} not found.`);
        }

        return existingGame;
    }
    catch (error) {
        throw new StorageError(`Failed to retrieve game log with id ${id}.`, 'read', error);
    }
}

export async function addNewGame(gameData: Omit<GameLog, 'id'>): Promise<GameLog> {
    try {
        const newGame: GameLog = {
            ...gameData,
            id: generateId()
        };

        await gamesStore.setItem(newGame.id, newGame);
        return newGame;
    }
    catch (error) {
        throw new StorageError('Failed to add new game log.', 'write', error);
    }
}

export async function updateExistingGame(id: string, updatedData: Partial<GameLog>): Promise<GameLog> {
    try {
        const existingGame = await gamesStore.getItem<GameLog>(id);

        if (!existingGame) {
            throw new Error(`Game with id ${id} not found.`);
        }

        const updatedGame: GameLog = {
            ...existingGame,
            ...updatedData
        }

        await gamesStore.setItem(updatedGame.id, updatedGame);
        return updatedGame;
    }
    catch (error) {
        throw new StorageError(`Failed to update game log with Id ${id}.`, 'write', error);
    }
}

export async function deleteGame(id: string): Promise<void> {
    try {
        await gamesStore.removeItem(id);
    }
    catch (error) {
        throw new StorageError(`Failed to remove game log with Id ${id}.`, 'delete', error);
    }
}