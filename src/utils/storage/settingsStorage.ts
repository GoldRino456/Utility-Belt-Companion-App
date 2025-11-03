import { AppSettings, StandardSet, ExpertSet } from '../../types';
import { settingsStore, StorageError } from './config';

const SETTINGS_KEY = 'settings';

const DEFAULT_SETTINGS: AppSettings = {
    defaultDifficulty: {
        standardSet: StandardSet.STANDARD,
        expertSet: ExpertSet.NONE
    },
    theme: 'light'
};

export async function getSettings(): Promise<AppSettings> {
    try {
        const settings = await settingsStore.getItem<AppSettings>(SETTINGS_KEY);
        return settings || DEFAULT_SETTINGS;
    }
    catch (error) {
        throw new StorageError('Failed to retrieve settings.', 'read', error);
    }
}

export async function saveSettings(settings: AppSettings) {
    try {
        await settingsStore.setItem(SETTINGS_KEY, settings);
    } catch (error) {
        throw new StorageError('Failed to save settings.', 'write', error);
    }
}

export async function updateSettings(updates: Partial<AppSettings>) {
    try {
        const currentSettings = await getSettings();
        const newSettings = { ...currentSettings, ...updates };
        await saveSettings(newSettings);
    } catch (error) {
        throw new StorageError('Failed to update settings.', 'write', error);
    }
}

export async function resetSettings() {
    try {
        await saveSettings(DEFAULT_SETTINGS);
    } catch (error) {
        throw new StorageError('Failed to reset settings.', 'write', error);
    }
}