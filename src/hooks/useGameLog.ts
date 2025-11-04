import { useState, useEffect } from 'react';
import { GameLog, Product } from '../types';
import { products } from '../data/products';
import { getAllGames, addNewGame, updateExistingGame, deleteGame, getCollection } from '../utils/storage';

interface UseGameLogReturn {
    games: GameLog[];
    ownedProducts: Product[];
    allProducts: Product[];
    addNewGameLog: (game: Omit<GameLog, 'id'>) => Promise<void>;
    updateExistingGameLog: (id: string, updates: Partial<GameLog>) => Promise<void>;
    deleteExistingGameLog: (id: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    refreshGames: () => Promise<void>;
}

export function useGameLog(): UseGameLogReturn {
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
            const [gamesData, collectionItems] = await Promise.all([
                getAllGames(),
                getCollection()
            ]);

            const ownedIds: string[] = [];
            collectionItems.forEach(c => ownedIds.push(c.productId));

            setGames(gamesData);
            setOwnedProductIds(ownedIds);
        }
        catch (error) {
            setError('Failed to load game data.');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    const addNewGameLog = async (game: Omit<GameLog, 'id'>) => {
        try {
            setError(null);
            await addNewGame(game);
            await loadData();
        }
        catch (error) {
            setError('Failed to add game.');
            console.error(error);
            throw error;
        }
    };

    const updateExistingGameLog = async (id: string, updates: Partial<GameLog>) => {
    try {
      setError(null);
      await updateExistingGame(id, updates);
      await loadData();
    } 
    catch (error) {
      setError('Failed to update game');
      console.error(error);
      throw error;
    }
  };

  const deleteExistingGameLog = async (id: string) => {
    try {
      setError(null);
      await deleteGame(id);
      await loadData();
    } catch (error) {
      setError('Failed to delete game');
      console.error(error);
      throw error;
    }
  };

  const ownedProducts = products.filter(p => ownedProductIds.includes(p.id));

  return {
    games,
    ownedProducts,
    allProducts: products,
    addNewGameLog,
    updateExistingGameLog,
    deleteExistingGameLog,
    loading,
    error,
    refreshGames: loadData
  };
}