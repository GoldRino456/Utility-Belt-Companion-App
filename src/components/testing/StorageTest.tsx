import { useState } from 'react';
import { Achievement, AchievementRequirement, AchievementCategory, CollectionItem, GameLog, GameResult, AspectType, StandardSet, ExpertSet } from '../../types';
import {
    getCollection, //Collection
    saveCollection,
    clearCollection,
    AddItemToCollection,
    RemoveItemFromCollection,
    getAllGames, //Game Logs
    clearGames,
    saveGames,
    getGameById,
    addNewGame,
    updateExistingGame,
    deleteGame,
    getAllAchievements, //Achievements
    clearAchievements,
    getAchievementById,
    saveAchievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    getSettings, //Settings
    saveSettings,
    updateSettings,
    resetSettings,
    exportAllData, //Export / Imports
    importData,
    clearAllData,
    downloadExportFile,
    readImportFile
} from '../../utils/storage';

function StorageTest() {
    const [output, setOutput] = useState<string>('Click a button to test storage...');
    const [loading, setLoading] = useState(false);

    const log = (message: string) => {
        console.log(message);
        setOutput(prev => prev + '\n' + message);
    };

    const clearOutput = () => setOutput('');

    //Collection Storage Test
    const testCollectionStore = async () => {
        setLoading(true);
        clearOutput();

        try {
            log('Testing Collection Storage...');

            const testCollection: CollectionItem[] = [
                { productId: 'core-set-2019' },
                { productId: 'cycle7-deadpool' }
            ];

            //Upload Collection
            await saveCollection(testCollection);
            log('SUCCESS: Saved collection');

            //Fetch Collection
            let retrieved = await getCollection();
            log(`SUCCESS: Retrieved ${retrieved.length} items.`);
            log(JSON.stringify(retrieved, null, 2));

            //Add Item To Collection
            await AddItemToCollection({ productId: 'cycle1-green-goblin' });
            retrieved = await getCollection();
            log(`SUCCESS: Added new item to store.`);
            log(JSON.stringify(retrieved, null, 2));

            //Remove Item From Collection
            await RemoveItemFromCollection('cycle1-green-goblin');
            retrieved = await getCollection();
            log(`SUCCESS: Removed item from store.`);
            log(JSON.stringify(retrieved, null, 2));
        }
        catch (error) {
            log('ERROR: ' + (error as Error).message);
        }

        setLoading(false);
    };

    //Game Storage Test
    const testGameStore = async () => {
        setLoading(true);
        clearOutput();

        try {
            log('Testing Game Storage...');

            //Add Game
            const testGame1: Omit<GameLog, 'id'> = {
                players: [
                    {
                        playerName: 'John Doe',
                        hero: {
                            name: 'Spider-Man',
                            alterEgo: 'Peter Parker',
                            nemesis: 'Vulture'
                        },
                        aspects: [AspectType.JUSTICE],
                        nemesisEncountered: false
                    }],
                dateTime: new Date().toISOString(),
                villain: {
                    name: 'Thanos',
                    requiredSets: ['Thanos', 'Infinity Stones'],
                    recommendedSets: ['Other Set 1', 'Other Set 2']
                },
                difficulty: {
                    standardSet: StandardSet.STANDARD,
                    expertSet: ExpertSet.NONE
                },
                requiredSets: ['Thanos', 'Infinity Stones'],
                additionalSets: ['Other Set 3'],
                result: GameResult.DEFEAT,
                notes: 'Did this work?'
            };

            const testGame2: Omit<GameLog, 'id'> = {
                players: [
                    {
                        playerName: 'Jane Doe',
                        hero: {
                            name: 'Iron Man',
                            alterEgo: 'Tony Stark',
                            nemesis: 'Whiplash'
                        },
                        aspects: [AspectType.AGGRESSION],
                        nemesisEncountered: true
                    }],
                dateTime: new Date().toISOString(),
                villain: {
                    name: 'Thanos',
                    requiredSets: ['Thanos', 'Infinity Stones'],
                    recommendedSets: ['Other Set 1', 'Other Set 2']
                },
                difficulty: {
                    standardSet: StandardSet.STANDARD,
                    expertSet: ExpertSet.NONE
                },
                requiredSets: ['Thanos', 'Infinity Stones'],
                additionalSets: ['Other Set 3'],
                result: GameResult.VICTORY,
                notes: 'Did this work???'
            };

            let addedGame = await addNewGame(testGame1);
            log('SUCCESS: Added game with ID: ' + addedGame.id);
            const initialGameId = addedGame.id;

            addedGame = await addNewGame(testGame2);
            log('SUCCESS: Added game with ID: ' + addedGame.id);

            //Get All Games
            const allGames = await getAllGames();
            log(`SUCCESS: Retrieved ${allGames.length} items.`);

            //Get Game By Id
            addedGame = await getGameById(initialGameId);
            log('SUCCESS: Retrieved game with ID: ' + addedGame.id);

            //Update Game
            const updates: Partial<GameLog> = {
                result: GameResult.VICTORY,
                notes: 'Nvm actually won this one, my b.'
            };

            const updatedRecord = await updateExistingGame(initialGameId, updates);
            log('SUCCESS: Updated game with ID: ' + initialGameId);

            //Remove Game
            await deleteGame(initialGameId);
            log('SUCCESS: Deleted game with ID: ' + initialGameId);
        }
        catch (error) {
            log('ERROR: ' + (error as Error).message);
        }

        setLoading(false);
    };

    //Achievement Storage Test
    const testAchievementStore = async () => {
        setLoading(true);
        clearOutput();

        try {
            log('Testing Achievement Storage...');
            const testAchId = 'defeats-thanos-5';

            //Add Achievement
            await addAchievement({
                id: testAchId,
                title: 'Actually Quite Evitable',
                description: 'Defeat Thanos 5 times with any combination of heroes.',
                category: AchievementCategory.VILLAIN_DEFEATS,
                isAutoTracked: true,
                requirement: {
                    type: 'villain_defeat',
                    villain: {
                        name: 'Thanos',
                        requiredSets: ['Thanos', 'Infinity Stones'],
                        recommendedSets: ['Other Set 1', 'Other Set 2']
                    },
                    count: 5
                },
                progress: 2,
                isCompleted: false
            });
            log('SUCCESS: Added achievement data with ID: ' + testAchId);

            //Delete Achievement
            await deleteAchievement(testAchId);
            log('SUCCESS: Deleted achievement data with ID: ' + testAchId);

            await addAchievement({
                id: testAchId,
                title: 'Actually Quite Evitable',
                description: 'Defeat Thanos 5 times with any combination of heroes.',
                category: AchievementCategory.VILLAIN_DEFEATS,
                isAutoTracked: true,
                requirement: {
                    type: 'villain_defeat',
                    villain: {
                        name: 'Thanos',
                        requiredSets: ['Thanos', 'Infinity Stones'],
                        recommendedSets: ['Other Set 1', 'Other Set 2']
                    },
                    count: 5
                },
                progress: 2,
                isCompleted: false
            });

            //Update Achievement
            await updateAchievement(testAchId, {
                progress: 5,
                isCompleted: true
            });
            log('SUCCESS: Updated achievement data with ID: ' + testAchId);

            //Get By Id
            const ach = await getAchievementById(testAchId);
            log('SUCCESS: Fetched achievement data with ID: ' + ach.id);

            //Get All
            const achList = await getAllAchievements();
            log('SUCCESS: Got list of Achievement Data with count: ' + achList.length);

            
        }
        catch (error) {
            log('ERROR: ' + (error as Error).message);
        }

        setLoading(false);
    };

    //Settings Storage Test
    const testSettingsStore = async () => {
        setLoading(true);
        clearOutput();

        try {
            log('Testing Settings Storage...');

            //Save Settings
            await saveSettings({
                defaultDifficulty: {
                    standardSet: StandardSet.STANDARD_II,
                    expertSet: ExpertSet.EXPERT
                },
                theme: 'dark'
            });
            log('SUCCESS: Saved Settings Data.');

            //Update Settings
            await updateSettings({ theme: 'light' });
            log('SUCCESS: Updated Settings Data.');

            //Get Settings
            const settings = await getSettings();
            log(`SUCCESS: Fetched Settings Data, theme: ${settings.theme}`);
        }
        catch (error) {
            log('ERROR: ' + (error as Error).message);
        }

        setLoading(false);
    };

    // Export Test
    const testExport = async () => {
        setLoading(true);
        clearOutput();

        try {
            log('Testing export data...');
            const exportData = await exportAllData();
            log(`Exported Data: `);
            log(`Version: ${exportData.version}`);
            log(`Date: ${exportData.exportDate}`);
            log(`Collection: ${exportData.collection}`);
            log(`Game Logs: ${exportData.games}`);
            log(`Achievements: ${exportData.achievements}`);
            log(`\nFull export json: `);
            log(JSON.stringify(exportData, null, 2));
        }
        catch (error) {
            log('ERROR: ' + (error as Error).message);
        }

        setLoading(false);
    };

    //Clear All Data Test
    const testClearData = async () => {
        if (!window.confirm('This will clear ALL test data. Continue?')) {
            return;
        }

        setLoading(true);
        clearOutput();

        try {
            log('Testing clear all data.');

            await clearAllData();
            log('SUCCESS: All data cleared.');

            const [collection, games, achievements] = await Promise.all([
                getCollection(),
                getAllGames(),
                getAllAchievements()
            ]);

            log(`Collection Count: ${collection}`);
            log(`Games Log Count: ${games}`);
            log(`Achievements Count: ${achievements}`);
        }
        catch (error) {
            log('ERROR: ' + (error as Error).message);
        }

        setLoading(false);
    };

    const runAllTests = async () => {
        await testCollectionStore();
        await new Promise(resolve => setTimeout(resolve, 500));
        await testGameStore();
        await new Promise(resolve => setTimeout(resolve, 500));
        await testAchievementStore();
        await new Promise(resolve => setTimeout(resolve, 500));
        await testSettingsStore();
        await new Promise(resolve => setTimeout(resolve, 500));
        await testExport();
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Storage Layer Test</h2>

            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={testCollectionStore}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    Test Collection
                </button>

                <button
                    onClick={testGameStore}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                    Test Games
                </button>

                <button
                    onClick={testAchievementStore}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                    Test Achievements
                </button>

                <button
                    onClick={testSettingsStore}
                    disabled={loading}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
                >
                    Test Settings
                </button>

                <button
                    onClick={testExport}
                    disabled={loading}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:bg-gray-400"
                >
                    Test Export
                </button>

                <button
                    onClick={runAllTests}
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400"
                >
                    Run All Tests
                </button>

                <button
                    onClick={testClearData}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
                >
                    Clear All Data
                </button>

                <button
                    onClick={clearOutput}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Clear Output
                </button>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm whitespace-pre-wrap overflow-auto max-h-96">
                {output}
            </div>

            {loading && (
                <div className="mt-4 text-center text-gray-600">
                    Running test...
                </div>
            )}
        </div>
    );
}

export default StorageTest;