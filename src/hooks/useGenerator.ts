import { useState, useEffect } from 'react';
import { Product, Hero, AspectType, StandardSet, ExpertSet, GeneratedScenario, GeneratorConfig } from '../types';
import { products, getAllAspects } from '../data/products';
import { getCollection, getRecentGames } from '../utils/storage';

interface UseGeneratorReturn {
  ownedProducts: Product[];
  allProducts: Product[];
  generateScenario: (config: GeneratorConfig) => GeneratedScenario | null;
  loading: boolean;
  error: string | null;
}

export function useGenerator(): UseGeneratorReturn {
  const [ownedProductIds, setOwnedProductIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOwnedProducts();
  }, []);

  const loadOwnedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const collection = await getCollection();
      const ownedProductIds = collection.map(c => c.productId);
      setOwnedProductIds(ownedProductIds);
    } catch (err) {
      setError('Failed to load owned products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const ownedProducts = products.filter(p => ownedProductIds.includes(p.id));

  const generateScenario = (config: GeneratorConfig): GeneratedScenario | null => {
    try {
      const availableVillains = ownedProducts.flatMap(p => p.villains);
      const availableHeroes = ownedProducts.flatMap(p => p.heroes);
      const availableModularSets = ownedProducts.flatMap(p => p.modularSets);
      const availableStandardSets = [...new Set(ownedProducts.flatMap(p => p.standardSets))];
      const availableExpertSets = [...new Set(ownedProducts.flatMap(p => p.expertSets))];

      if (availableVillains.length === 0) {
        throw new Error('No villains available. Please add some products to your collection.');
      }

      let filteredVillains = [...availableVillains];
      let filteredHeroes = [...availableHeroes];

      if (config.excludeRecentlyPlayed) {
        // TODO: Implement exclusion logic based on recent games
      }

      // Select random villain
      const villain = filteredVillains[Math.floor(Math.random() * filteredVillains.length)];
      const requiredSets = villain.requiredSets || [];

      // Determine difficulty
      let standardSet = config.difficulty.standardSet;
      let expertSet = config.difficulty.expertSet;

       // If random, pick from available owned sets
      if (standardSet === StandardSet.RANDOM && availableStandardSets.length > 0) {
        // Random selection logic - prefer Standard
        const preferredSets = availableStandardSets.filter(s => s !== StandardSet.RANDOM);
        if (preferredSets.length > 0) {
          standardSet = preferredSets[Math.floor(Math.random() * preferredSets.length)];
        }
      }

      if (expertSet === ExpertSet.NONE && config.difficulty.expertSet === ExpertSet.NONE) {
        // Keep as None unless user wants random
      }

      // Select additional modular sets
      const availableAdditionalSets = availableModularSets.filter(
        set => !requiredSets.includes(set)
      );
      
      const additionalSets: string[] = [];
      const shuffled = [...availableAdditionalSets].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < Math.min(config.additionalSetCount, shuffled.length); i++) {
        additionalSets.push(shuffled[i]);
      }

      // Generate hero lineup if requested
      let players: Array<{ hero: Hero; aspects: AspectType[] }> | undefined;

      if (config.randomizeHeroes) {
        if (filteredHeroes.length < config.playerCount) {
          throw new Error(`Not enough heroes available. Need ${config.playerCount}, have ${filteredHeroes.length}`);
        }

        // Select random heroes (no duplicates)
        const selectedHeroes: Hero[] = [];
        const shuffledHeroes = [...filteredHeroes].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < config.playerCount; i++) {
          selectedHeroes.push(shuffledHeroes[i]);
        }
    
        // Generate aspects for each hero
        players = selectedHeroes.map(hero => {
          let aspects: AspectType[];

          if (config.randomizeAspects) {
            // Random aspects
            const availableAspects = getAllAspects().filter(a => a !== AspectType.BASIC);
            const aspectCount = hero.prebuiltAspects ? hero.prebuiltAspects.length : 1; // Match number of aspects on prebuilt deck
            const shuffledAspects = [...availableAspects].sort(() => Math.random() - 0.5);
            aspects = shuffledAspects.slice(0, Math.min(aspectCount, availableAspects.length));
          } else {
            // Use prebuilt aspects
            aspects = hero.prebuiltAspects || [AspectType.BASIC];
          }

          return {
            hero: hero,
            aspects: aspects
          };
        });
      }

      return {
        villain: villain,
        difficulty: {
          standardSet,
          expertSet
        },
        requiredSets,
        additionalSets,
        players
      };

    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  return {
    ownedProducts,
    allProducts: products,
    generateScenario,
    loading,
    error
  };
}