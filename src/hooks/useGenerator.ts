import { useState, useEffect } from 'react';
import { Product, Hero, AspectType, StandardSet, GeneratedScenario, GeneratorConfig } from '../types';
import { products } from '../data/products';
import { getCollection, getRecentGames } from '../utils/storage';

interface UseGeneratorReturn {
  ownedProducts: Product[];
  allProducts: Product[];
  generateScenario: (config: GeneratorConfig) => Promise<GeneratedScenario | null>;
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

    const generateScenario = async (config: GeneratorConfig): Promise<GeneratedScenario | null> => {
    try {
      const availableVillains = ownedProducts.flatMap(p => p.villains);
      const availableHeroes = ownedProducts.flatMap(p => p.heroes);
      const availableModularSets = ownedProducts.flatMap(p => p.modularSets);
      const availableStandardSets = [...new Set(ownedProducts.flatMap(p => p.standardSets))];

      if (availableVillains.length === 0) {
        throw new Error('No villains available. Please add some products to your collection.');
      }

      let filteredVillains = [...availableVillains];
      let filteredHeroes = [...availableHeroes];

      //Remove content from X number of recent games (if able)
      if (config.excludeRecentlyPlayed && config.excludeCount > 0) {
          const recentGames = await getRecentGames(config.excludeCount);
          const recentVillains = new Set(recentGames.flatMap(g => g.villain.name));
          const recentHeroes = new Set(recentGames.flatMap(g => g.players.flatMap(p => p.hero.id)));

          const newFilteredHeroes = filteredHeroes.filter(h => !recentHeroes.has(h.id));
          const newFilteredVillains = filteredVillains.filter(v => !recentVillains.has(v.name));

          const minHeroesNeeded = config.randomizeHeroes ? config.playerCount : 0;

          if (newFilteredVillains.length >= 1 && newFilteredHeroes.length >= minHeroesNeeded) {
              filteredHeroes = newFilteredHeroes;
              filteredVillains = newFilteredVillains;

              console.log("FilteredHeroes: " + filteredHeroes.length);
              console.log("FilteredVillains: " + filteredVillains.length);
          }
      }

      // Select random villain
      const villain = filteredVillains[Math.floor(Math.random() * filteredVillains.length)];
      let requiredSets = villain.requiredSets || [];
      let additionalSets: string[] = [];

        console.log("Chosen: " + villain.name);

      // Determine difficulty
      let standardSet = config.difficulty.standardSet;
      const expertSet = config.difficulty.expertSet;

       // If random standard set, pick from available owned sets
      if (standardSet === StandardSet.RANDOM && availableStandardSets.length > 0) {
        // Random selection logic - prefer Standard I
        const preferredSets = availableStandardSets.filter(s => s !== StandardSet.RANDOM);
        if (preferredSets.length > 0) {
          standardSet = preferredSets[Math.floor(Math.random() * preferredSets.length)];
        }
        }

        //Does the villain require a module for proper configuration?
        if (config.matchEncounterSetNumber && villain.generatorModule) {
            const moduleValues = villain.generatorModule.generateScenario(villain, config.playerCount);

            requiredSets = moduleValues.requiredSets;
            additionalSets = moduleValues.recommendedSets;
        }
        else {
            const availableAdditionalSets = availableModularSets.filter(
                set => !requiredSets.includes(set)
            );

            const shuffled = [...availableAdditionalSets].sort(() => Math.random() - 0.5);
            let numAdditionalSets = 0;

            //Match the number of recommended sets?
            if (config.matchEncounterSetNumber) {
                numAdditionalSets = villain.recommendedSets ? villain.recommendedSets.length : 0;
            }
            else {
                //User specified value of sets
                numAdditionalSets = config.additionalSetCount;
            }

            for (let i = 0; i < Math.min(numAdditionalSets, shuffled.length); i++) {
                additionalSets.push(shuffled[i]);
            }
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
            const availableAspects = ownedProducts.flatMap(p => p.aspects).filter(a => a !== AspectType.BASIC);
            const aspectCount = hero.prebuiltAspects ? hero.prebuiltAspects.length : 1; // Match number of aspects on prebuilt deck
            const shuffledAspects = [...availableAspects].sort(() => Math.random() - 0.5);
            aspects = shuffledAspects.slice(0, Math.min(aspectCount, availableAspects.length));
          } else {
            // Player Will Assign in Log
            aspects = [];
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