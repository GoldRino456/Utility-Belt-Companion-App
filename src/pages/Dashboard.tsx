import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../hooks/useDashboard';
import { GameResult } from '../types';
import updatesInfo from '../data/recentUpdateInfo.json';
function Dashboard() {
    const navigate = useNavigate();
    const { stats, recentGames, topHeroes, mostFacedVillain, loading, error } = useDashboard();

    const recentUpdates = updatesInfo.updates.slice(0, 3);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-gray-600">Loading dashboard...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-300 rounded-lg p-6">
                <h3 className="text-red-800 font-semibold mb-2">Error Loading Dashboard</h3>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    // Format relative date
    const formatRelativeDate = (dateString: string): string => {
        const date = new Date(dateString);
        const tzOffset = date.getTimezoneOffset() * 60000;

        const now = new Date();
        const diffMs = new Date(now.getTime() - tzOffset).getTime() - new Date(date.getTime() - tzOffset).getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg shadow p-6">
                <h1 className="text-3xl font-bold mb-2">Welcome to The Utility Belt</h1>
                <p className="text-red-100">Track your games, manage your collection, and generate random scenarios for the Marvel Champions LCG.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Games */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Total Games</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalGames}</p>
                        </div>
                        <div className="text-4xl">🎮</div>
                    </div>
                </div>

                {/* Win Rate */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Win Rate</p>
                            <p className={`text-3xl font-bold mt-1 ${stats.winRate >= 50 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {stats.totalGames > 0 ? `${stats.winRate.toFixed(1)}%` : '—'}
                            </p>
                        </div>
                        <div className="text-4xl">{stats.winRate >= 50 ? '📈' : '📉'}</div>
                    </div>
                </div>

                {/* Products Owned */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Products Owned</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">
                                {stats.ownedProductCount} / {stats.totalProductCount}
                            </p>
                        </div>
                        <div className="text-4xl">📦</div>
                    </div>
                </div>

                {/* Current Streak */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Current Streak</p>
                            <p className={`text-3xl font-bold mt-1 ${stats.isWinStreak ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {stats.currentStreak > 0 ? stats.currentStreak : '—'}
                            </p>
                            {stats.currentStreak > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {stats.isWinStreak ? 'wins' : 'losses'}
                                </p>
                            )}
                        </div>
                        <div className="text-4xl">{stats.isWinStreak ? '🔥' : '💀'}</div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Games - Left Column (2/3 width) */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-800">Recent Games</h2>
                        </div>
                        <div className="p-6">
                            {recentGames.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 mb-4">No games logged yet</p>
                                    <button
                                        onClick={() => navigate('/games')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                                    >
                                        Log Your First Game
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentGames.map(game => (
                                        <div
                                            key={game.id}
                                            className={`p-4 rounded-lg border-l-4 ${game.result === GameResult.VICTORY
                                                    ? 'bg-green-50 border-green-500'
                                                : (game.result === GameResult.IN_PROGRESS ? 'bg-purple-50 border-purple-500'
                                                    : 'bg-red-50 border-red-500')
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-grow min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${game.result === GameResult.VICTORY
                                                                ? 'bg-green-600 text-white'
                                                            : (game.result === GameResult.IN_PROGRESS ? 'bg-purple-600 text-white'
                                                                : 'bg-red-600 text-white')
                                                            }`}>
                                                            {game.result}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {formatRelativeDate(game.dateTime)}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm">
                                                        <span className="font-medium text-gray-900">
                                                            {game.players.map(p => p.hero.name).join(', ')}
                                                        </span>
                                                        <span className="text-gray-500"> vs </span>
                                                        <span className="font-medium text-gray-900">{game.villain.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-4 text-center">
                                        <button
                                            onClick={() => navigate('/games')}
                                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                        >
                                            View All Games →
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column (1/3 width) */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/generator')}
                                className="w-full px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium transition-colors text-left flex items-center gap-3"
                            >
                                <span className="text-xl">🎲</span>
                                <span>Generate Scenario</span>
                            </button>
                            <button
                                onClick={() => navigate('/games')}
                                className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors text-left flex items-center gap-3"
                            >
                                <span className="text-xl">➕</span>
                                <span>Log New Game</span>
                            </button>
                            <button
                                onClick={() => navigate('/collection')}
                                className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium transition-colors text-left flex items-center gap-3"
                            >
                                <span className="text-xl">📦</span>
                                <span>Manage Collection</span>
                            </button>
                        </div>
                    </div>

                    {/* What's New */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">What's New</h3>
                        <div className="space-y-4">
                            {recentUpdates.map((update, idx) => (
                                <div key={idx} className={idx > 0 ? 'pt-4 border-t border-gray-200' : ''}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-gray-900">{update.version}</span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(update.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <ul className="space-y-1">
                                        {update.changes.slice(0, 3).map((change, cIdx) => (
                                            <li key={cIdx} className="text-sm text-gray-600 flex items-start gap-2">
                                                <span className="text-blue-600 mt-0.5">•</span>
                                                <span>{change}</span>
                                            </li>
                                        ))}
                                        {update.changes.length > 3 && (
                                            <li className="text-xs text-gray-500 italic ml-4">
                                                +{update.changes.length - 3} more...
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                            <a
                                href="https://github.com/GoldRino456/Utility-Belt-Companion-App"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-700"
                            >
                                View full changelog on GitHub →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Performers - Full Width */}
            {(topHeroes.length > 0 || mostFacedVillain) && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Top Performers</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Top Heroes */}
                        {topHeroes.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-4">Heroes by Win Rate</h3>
                                <div className="space-y-3">
                                    {topHeroes.map((hero, idx) => (
                                        <div key={hero.heroName} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-medium text-gray-900">{hero.heroName}</span>
                                                    <span className="text-sm text-gray-600">
                                                        {hero.gamesPlayed} games • {hero.winRate.toFixed(1)}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full transition-all"
                                                        style={{ width: `${hero.winRate}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Most Faced Villain */}
                        {mostFacedVillain && (
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-4">Most Faced Villain</h3>
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900">{mostFacedVillain.villainName}</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Faced {mostFacedVillain.timesFaced} times
                                            </p>
                                        </div>
                                        <div className="text-4xl">🦹</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">Your Win Rate:</span>
                                            <span className={`font-semibold ${mostFacedVillain.winRate >= 50 ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {mostFacedVillain.winRate.toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all ${mostFacedVillain.winRate >= 50 ? 'bg-green-600' : 'bg-red-600'
                                                    }`}
                                                style={{ width: `${mostFacedVillain.winRate}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                                            <span>{mostFacedVillain.victories} wins</span>
                                            <span>{mostFacedVillain.timesFaced - mostFacedVillain.victories} losses</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;