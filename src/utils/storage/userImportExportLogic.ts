import { ExportData } from '../../types';
import { StorageError } from './config';
import { clearCollection, getCollection, saveCollection } from './collectionStorage';
import { clearGames, getAllGames, saveGames } from './gameStorage';
import { clearAchievements, getAllAchievements, saveAchievements } from './achievementStorage';
import { getSettings, saveSettings } from './settingsStorage';

const APP_VERSION = '0.1';

export async function exportAllData(): Promise<ExportData> {
    try {
        const [collection, games, achievements, settings] = await Promise.all([
            getCollection(),
            getAllGames(),
            getAllAchievements(),
            getSettings()
        ]);

        const exportData: ExportData = {
            version: APP_VERSION,
            exportDate: new Date().toISOString(),
            collection,
            games,
            achievements,
            settings
        };

        return exportData;
    }
    catch (error) {
        throw new StorageError('Failed to collect data for export.', 'read', error);
    }
}

export async function importData(data: ExportData, mode: 'merge' | 'replace'): Promise<void> {
    try {
        // Validate data structure
        if (!isValidExportData(data)) {
            throw new Error('Invalid export data format');
        }
        if (mode === 'replace') {
      // Replace all data
      await Promise.all([
        saveCollection(data.collection),
        saveGames(data.games),
        saveAchievements(data.achievements),
        saveSettings(data.settings)
      ]);
    } else {
      // Merge mode: combine with existing data
      const [currentCollection, currentGames, currentAchievements] = await Promise.all([
        getCollection(),
        getAllGames(),
        getAllAchievements()
      ]);

      // Merge collections (don't duplicate product IDs)
      const mergedCollection = [...currentCollection];
      data.collection.forEach(newItem => {
        const existingIndex = mergedCollection.findIndex(c => c.productId === newItem.productId);
        if (existingIndex >= 0) {
          mergedCollection[existingIndex] = newItem; // Update existing
        } else {
          mergedCollection.push(newItem); // Add new
        }
      });

      // Merge games (don't duplicate IDs)
      const existingGameIds = new Set(currentGames.map(g => g.id));
      const newGames = data.games.filter(g => !existingGameIds.has(g.id));
      const mergedGames = [...currentGames, ...newGames];

      // Merge achievements (don't duplicate IDs)
      const mergedAchievements = [...currentAchievements];
      data.achievements.forEach(newAch => {
        const existingIndex = mergedAchievements.findIndex(a => a.id === newAch.id);
        if (existingIndex >= 0) {
          mergedAchievements[existingIndex] = newAch; // Update existing
        } else {
          mergedAchievements.push(newAch); // Add new
        }
      });

      // Save merged data (keep current settings in merge mode)
      await Promise.all([
        saveCollection(mergedCollection),
        saveGames(mergedGames),
        saveAchievements(mergedAchievements)
      ]);
    }
  } catch (error) {
    throw new StorageError('Failed to import data', 'write', error);
  }
}

export async function clearAllData() {
    try {
        await Promise.all([
            clearCollection(),
            clearGames(),
            clearAchievements()
        ]);
    }
    catch (error) {
        throw new StorageError('Failed to clear existing data.', 'delete', error);
    }
}

function isValidExportData(data: any): data is ExportData {
    return (
        data &&
        typeof data === 'object' &&
        typeof data.version === 'string' &&
        typeof data.exportDate === 'string' &&
        Array.isArray(data.collection) &&
        Array.isArray(data.games) &&
        Array.isArray(data.achievements) &&
        typeof data.settings === 'object'
    );
}

export function downloadExportFile(data: ExportData) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `mc-utility-belt-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export function readImportFile(file: File): Promise<ExportData> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);
                if (isValidExportData(data)) {
                    resolve(data);
                } else {
                    reject(new Error('Invalid file format'));
                }
            } catch (error) {
                reject(new Error('Failed to parse JSON file'));
            }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}