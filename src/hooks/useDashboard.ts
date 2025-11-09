import { useState, useEffect, useMemo } from 'react';
import { GameLog, GameResult } from '../types';
import { getAllGames, getCollection } from '../utils/storage';
import { products } from '../data/products';

interface HeroStats {
    heroName: string;
    gamesPlayed: number;
    victories: number;
    winRate: number;
}

interface VillainStats {
    villainName: string;
    timesFaced: number;
    victories: number;
    winRate: number;
}

interface DashboardStats {
    totalGames: number;
    totalVictories: number;
    totalDefeats: number;
    winRate: number;
    currentStreak: number;
    isWinStreak: boolean;
    ownedProductCount: number;
    totalProductCount: number;
}

interface UseDashboardReturn {
    stats: DashboardStats;
    recentGames: GameLog[];
    topHeroes: HeroStats[];
    mostFacedVillain: VillainStats | null;
    loading: boolean;
    error: string | null;
}

export function useDashboard(): UseDashboardReturn {
    const [games, setGames] = useState<GameLog[]>([]);
    const [ownedProductIds, setOwnedProductIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [gamesData, ownedIds] = await Promise.all([
                getAllGames(),
                (await getCollection()).flatMap(c => c.productId)
            ]);
            setGames(gamesData);
            setOwnedProductIds(ownedIds);
        } catch (err) {
            setError('Failed to load dashboard data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Calculate overall stats
    const stats: DashboardStats = useMemo(() => {
        const totalGames = games.filter(g => g.result !== GameResult.IN_PROGRESS).length;
        const totalVictories = games.filter(g => g.result === GameResult.VICTORY).length;
        const totalDefeats = totalGames - totalVictories;
        const winRate = totalGames > 0 ? (totalVictories / totalGames) * 100 : 0;

        // Calculate current streak
        let currentStreak = 0;
        let isWinStreak = true;

        if (games.length > 0) {
            // Sort by date (newest first)
            const sortedGames = [...games].filter(g => g.result !== GameResult.IN_PROGRESS)
                .sort((a, b) => new Date(b.dateTime)
                    .getTime() - new Date(a.dateTime).getTime()
            );

            const mostRecentResult = sortedGames[0].result;
            isWinStreak = mostRecentResult === GameResult.VICTORY;

            for (const game of sortedGames) {
                if (game.result === mostRecentResult) {
                    currentStreak++;
                } else {
                    break;
                }
            }
        }

        return {
            totalGames,
            totalVictories,
            totalDefeats,
            winRate,
            currentStreak,
            isWinStreak,
            ownedProductCount: ownedProductIds.length,
            totalProductCount: products.length
        };
    }, [games, ownedProductIds]);

    // Get recent games (last 5)
    const recentGames = useMemo(() => {
        return [...games]
            .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
            .slice(0, 5);
    }, [games]);

    // Calculate top heroes
    const topHeroes: HeroStats[] = useMemo(() => {
        const heroMap = new Map<string, { heroName: string;  victories: number; total: number }>();

        games.forEach(game => {
            game.players.forEach(player => {
                const heroId = player.hero.id;
                const stats = heroMap.get(heroId) || { heroName: player.hero.name + " (" + player.hero.alterEgo + ")", victories: 0, total: 0 };

                if (game.result === GameResult.VICTORY) {
                    stats.victories++;
                }

                //Don't count in-progress games toward total
                if (game.result !== GameResult.IN_PROGRESS) {
                    stats.total++;
                }

                heroMap.set(heroId, stats);
            });
        });

        // Filter heroes with at least 3 games and calculate win rates
        const heroStats = Array.from(heroMap.entries())
            .filter(([_, stats]) => stats.total >= 3)
            .map(([heroId, stats]): HeroStats => ({
                heroName: stats.heroName,
                gamesPlayed: stats.total,
                victories: stats.victories,
                winRate: (stats.victories / stats.total) * 100
            }))
            .sort((a, b) => b.winRate - a.winRate)
            .slice(0, 5); // Top 5

        return heroStats;
    }, [games]);

    // Calculate most faced villain
    const mostFacedVillain: VillainStats | null = useMemo(() => {
        const villainMap = new Map<string, { victories: number; total: number }>();

        games.forEach(game => {
            const stats = villainMap.get(game.villain.name) || { victories: 0, total: 0 };

            if (game.result === GameResult.VICTORY) {
                stats.victories++;
            }

            //Don't count in-progress games toward total
            if (game.result !== GameResult.IN_PROGRESS) {
                stats.total++;
            }

            villainMap.set(game.villain.name, stats);
        });

        if (villainMap.size === 0) return null;

        // Find most faced villain
        let mostFaced: VillainStats | null = null;
        let maxCount = 0;

        villainMap.forEach((stats, villainName) => {
            if (stats.total > maxCount) {
                maxCount = stats.total;
                mostFaced = {
                    villainName,
                    timesFaced: stats.total,
                    victories: stats.victories,
                    winRate: (stats.victories / stats.total) * 100
                };
            }
        });

        return mostFaced;
    }, [games]);

    return {
        stats,
        recentGames,
        topHeroes,
        mostFacedVillain,
        loading,
        error
    };
}
