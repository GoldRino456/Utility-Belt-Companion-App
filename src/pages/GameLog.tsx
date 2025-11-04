import { useState, useMemo } from 'react';
import { useGameLog } from '../hooks/useGameLog';
import GameForm from '../components/games/GameForm';
import GameCard from '../components/games/GameCard';
import { GameLog as GameLogType, GameResult, AspectType } from '../types';

function GameLog() {
    const {
        games,
        ownedProducts,
        allProducts,
        addNewGameLog,
        updateExistingGameLog,
        deleteExistingGameLog,
        loading,
        error
    } = useGameLog();

    const [showForm, setShowForm] = useState(false);
    const [editingGame, setEditingGame] = useState<GameLogType | undefined>();

    // Filters
    const [filterHero, setFilterHero] = useState('');
    const [filterVillain, setFilterVillain] = useState('');
    const [filterAspect, setFilterAspect] = useState('');
    const [filterResult, setFilterResult] = useState('');
    const [filterNemesis, setFilterNemesis] = useState('');
    const [sortBy, setSortBy] = useState<'date' | 'result'>('date');

    const allHeroes = useMemo(() => {
        const heroes = new Set<string>();
        games.forEach(game => {
            game.players.forEach(player => heroes.add(player.hero.name));
        });
        return Array.from(heroes).sort();
    }, [games]);

    const allVillains = useMemo(() => {
        const villains = new Set(games.map(g => g.villain));
        return Array.from(villains).sort();
    }, [games]);

    const allAspects = useMemo(() => {
        const aspects = new Set<AspectType>();
        games.forEach(game => {
            game.players.forEach(player => {
                player.aspects.forEach(aspect => aspects.add(aspect));
            });
        });
        return Array.from(aspects).sort();
    }, [games]);

    const filteredGames = useMemo(() => {
        let filtered = games;

        if (filterHero) {
            filtered = filtered.filter(game =>
                game.players.some(p => p.hero.name === filterHero)
            );
        }

        if (filterVillain) {
            filtered = filtered.filter(game => game.villain.name === filterVillain);
        }

        if (filterAspect) {
            filtered = filtered.filter(game =>
                game.players.some(p => p.aspects.some(a => a === filterAspect))
            );
        }

        if (filterResult) {
            filtered = filtered.filter(game => game.result === filterResult);
        }

        if (filterNemesis === 'yes') {
            filtered = filtered.filter(game =>
                game.players.some(p => p.nemesisEncountered)
            );
        } else if (filterNemesis === 'no') {
            filtered = filtered.filter(game =>
                !game.players.some(p => p.nemesisEncountered)
            );
        }

        const sorted = [...filtered].sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
            } else {
                // Sort by result (victories first)
                if (a.result === b.result) {
                    return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
                }
                return a.result === GameResult.VICTORY ? -1 : 1;
            }
        });

        return sorted;
    }, [games, filterHero, filterVillain, filterAspect, filterResult, filterNemesis, sortBy]);

    const stats = useMemo(() => {
        const total = games.length;
        const victories = games.filter(g => g.result === GameResult.VICTORY).length;
        const defeats = total - victories;
        const winRate = total > 0 ? ((victories / total) * 100).toFixed(1) : '0';

        return { total, victories, defeats, winRate };
    }, [games]);

    const handleAddGame = async (game: Omit<GameLogType, 'id'>) => {
        try {
            if (editingGame) {
                await updateExistingGameLog(editingGame.id, game);
            } else {
                await addNewGameLog(game);
            }
            setShowForm(false);
            setEditingGame(undefined);
        } catch (error) {
            // Error is already handled in the hook
        }
    };

    const handleEditGame = (game: GameLogType) => {
        setEditingGame(game);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingGame(undefined);
    };

    const clearFilters = () => {
        setFilterHero('');
        setFilterVillain('');
        setFilterAspect('');
        setFilterResult('');
        setFilterNemesis('');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-gray-600">Loading games...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-300 rounded-lg p-6">
                <h3 className="text-red-800 font-semibold mb-2">Error Loading Games</h3>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }
    return (
        <div>
            {/* Header with Stats */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Game Log</h2>
                        <p className="text-gray-600 mt-1">Track your Marvel Champions games</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                        {showForm ? 'Cancel' : '+ Add Game'}
                    </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="text-center p-3 bg-gray-50 rounded">
                        <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                        <div className="text-sm text-gray-600">Total Games</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-2xl font-bold text-green-700">{stats.victories}</div>
                        <div className="text-sm text-gray-600">Victories</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded">
                        <div className="text-2xl font-bold text-red-700">{stats.defeats}</div>
                        <div className="text-sm text-gray-600">Defeats</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-2xl font-bold text-blue-700">{stats.winRate}%</div>
                        <div className="text-sm text-gray-600">Win Rate</div>
                    </div>
                </div>
            </div>

            {/* Game Form */}
            {showForm && (
                <div className="mb-6">
                    <GameForm
                        ownedProducts={ownedProducts}
                        allProducts={allProducts}
                        onSubmit={handleAddGame}
                        onCancel={handleCancelForm}
                        existingGame={editingGame}
                    />
                </div>
            )}

            {/* Filters */}
            {games.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-800">Filters</h3>
                        <button
                            onClick={clearFilters}
                            className="text-sm text-blue-600 hover:text-blue-700"
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {/* Hero Filter */}
                        <select
                            value={filterHero}
                            onChange={(e) => setFilterHero(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Heroes</option>
                            {allHeroes.map(hero => (
                                <option key={hero} value={hero}>{hero}</option>
                            ))}
                        </select>

                        {/* Villain Filter */}
                        <select
                            value={filterVillain}
                            onChange={(e) => setFilterVillain(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Villains</option>
                            {allVillains.map(villain => (
                                <option key={villain.name} value={villain.name}>{villain.name}</option>
                            ))}
                        </select>

                        {/* Aspect Filter */}
                        <select
                            value={filterAspect}
                            onChange={(e) => setFilterAspect(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Aspects</option>
                            {allAspects.map(aspect => (
                                <option key={aspect} value={aspect}>{aspect}</option>
                            ))}
                        </select>

                        {/* Result Filter */}
                        <select
                            value={filterResult}
                            onChange={(e) => setFilterResult(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Results</option>
                            <option value={GameResult.VICTORY}>Victory</option>
                            <option value={GameResult.DEFEAT}>Defeat</option>
                        </select>

                        {/* Nemesis Filter */}
                        <select
                            value={filterNemesis}
                            onChange={(e) => setFilterNemesis(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Nemesis (Any)</option>
                            <option value="yes">Nemesis: Yes</option>
                            <option value="no">Nemesis: No</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'date' | 'result')}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="date">Sort: Newest First</option>
                            <option value="result">Sort: Victories First</option>
                        </select>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                        Showing {filteredGames.length} of {games.length} games
                    </div>
                </div>
            )}

            {/* Game List */}
            {games.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-gray-600 mb-4">No games logged yet</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                        Add Your First Game
                    </button>
                </div>
            ) : filteredGames.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-gray-600">No games match the current filters</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredGames.map(game => (
                        <GameCard
                            key={game.id}
                            game={game}
                            onEdit={handleEditGame}
                            onDelete={deleteExistingGameLog}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default GameLog;