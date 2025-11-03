export {
    generateId,
    StorageError
} from './config';

//Collections
export {
    getCollection,
    saveCollection,
    clearCollection,
    AddItemToCollection,
    RemoveItemFromCollection
} from './collectionStorage';

//Game Log
export {
    getAllGames,
    saveGames,
    clearGames,
    getGameById,
    addNewGame,
    updateExistingGame,
    deleteGame
} from './gameStorage';

//Achievements
export {
    getAllAchievements,
    saveAchievements,
    clearAchievements,
    getAchievementById,
    addAchievement,
    updateAchievement,
    deleteAchievement
} from './achievementStorage';

//Settings
export {
    getSettings,
    saveSettings,
    updateSettings,
    resetSettings
} from './settingsStorage';

//Export / Import Ops
export {
    exportAllData,
    importData,
    clearAllData,
    downloadExportFile,
    readImportFile
} from './userImportExportLogic';