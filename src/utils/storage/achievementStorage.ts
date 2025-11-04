import { Achievement } from '../../types';
import { achievementsStore, StorageError } from './config';

export async function getAllAchievements(): Promise<Achievement[]> {
    try {
        const allAchievements: Achievement[] = [];
        await achievementsStore.iterate(function(value) {
                    allAchievements.push(value as Achievement);
                });

        return allAchievements;
    }
    catch (error) {
        throw new StorageError('Failed to retrieve achievement data.', 'read', error);
    }
}

export async function clearAchievements() {
    try {
        await achievementsStore.clear();
    }
    catch (error) {
        throw new StorageError('Failed to clear achievement records.', 'delete', error);
    }
}

export async function getAchievementById(id: string): Promise<Achievement> {
    try {
        const existingAchievement = await achievementsStore.getItem<Achievement>(id);

        if (!existingAchievement) {
            throw new Error(`Achievement data with id ${id} not found.`);
        }

        return existingAchievement;
    }
    catch (error) {
        throw new StorageError(`Failed to retrieve achievement data with id ${id}.`, 'read', error);
    }
}

export async function saveAchievements(achievements: Achievement[]) {
    try {
        for (const elem of achievements) {
            await achievementsStore.setItem(elem.id, elem);
        }
    } catch (error) {
        throw new StorageError('Failed to save achievements.', 'write', error);
    }
}

export async function addAchievement(newAchievement: Achievement): Promise<void> {
    try {
        await achievementsStore.setItem(newAchievement.id, newAchievement);
    }
    catch (error) {
        throw new StorageError(`Failed to save new achievement data with Id ${newAchievement.id}`, 'write', error);
    }
}

export async function updateAchievement(id: string, updates: Partial<Achievement>): Promise<Achievement> {
    try {
        const existingAchievement = await achievementsStore.getItem<Achievement>(id);

        if (!existingAchievement) {
            throw new Error(`Achievement data with id ${id} not found. No existing progress to update.`);
        }

        const updatedAchievement: Achievement = {
            ...existingAchievement,
            ...updates
        }

        await achievementsStore.setItem(updatedAchievement.id, updatedAchievement);
        return updatedAchievement;
    }
    catch (error) {
        throw new StorageError(`Failed to update achievement data with Id ${id}.`, 'write', error);
    }
}

export async function deleteAchievement(id: string): Promise<void> {
    try {
        await achievementsStore.removeItem(id);
    }
    catch (error) {
        throw new StorageError(`Failed to remove achievement data with Id ${id}.`, 'delete', error);
    }
}