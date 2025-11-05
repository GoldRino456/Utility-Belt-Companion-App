import { useState } from 'react';
import { GeneratorConfig, StandardSet, ExpertSet, Product } from '../../types';

interface GeneratorFormProperties {
  ownedProducts: Product[];
  onGenerate: (config: GeneratorConfig) => void;
}

function GeneratorForm({ ownedProducts, onGenerate }: GeneratorFormProperties) {
  const [playerCount, setPlayerCount] = useState(1);
  const [standardSet, setStandardSet] = useState<StandardSet>(StandardSet.STANDARD);
  const [expertSet, setExpertSet] = useState<ExpertSet>(ExpertSet.NONE);
  const [additionalSetCount, setAdditionalSetCount] = useState(0);
  const [randomizeHeroes, setRandomizeHeroes] = useState(false);
  const [randomizeAspects, setRandomizeAspects] = useState(false);
  const [excludeRecentlyPlayed, setExcludeRecentlyPlayed] = useState(false);
  const [excludeCount, setExcludeCount] = useState(10);

  // Get available Standard/Expert sets from owned products
  const ownedStandardSets = [
    StandardSet.RANDOM,
    ...new Set(ownedProducts.flatMap(p => p.standardSets))
  ];
  const ownedExpertSets = [
    ExpertSet.NONE,
    ...new Set(ownedProducts.flatMap(p => p.expertSets))
  ];

  const handleGenerate = () => {
    const config: GeneratorConfig = {
      playerCount,
      difficulty: {
        standardSet,
        expertSet
      },
      additionalSetCount,
      randomizeHeroes,
      randomizeAspects,
      excludeRecentlyPlayed,
      excludeCount
    };

    onGenerate(config);
  };

  // Show warning for Expert II
  const showExpertIIWarning = expertSet === ExpertSet.EXPERT_II;

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Configuration</h3>

      {/* Player Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Players
        </label>
        <select
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[1, 2, 3, 4].map(n => (
            <option key={n} value={n}>{n} Player{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {/* Difficulty Settings */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800">Difficulty</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Standard Set */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Standard Set
            </label>
            <select
              value={standardSet}
              onChange={(e) => setStandardSet(e.target.value as StandardSet)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ownedStandardSets.map(set => (
                <option key={set} value={set}>{set}</option>
              ))}
            </select>
          </div>

          {/* Expert Set */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expert Set
            </label>
            <select
              value={expertSet}
              onChange={(e) => setExpertSet(e.target.value as ExpertSet)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ownedExpertSets.map(set => (
                <option key={set} value={set}>{set}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Expert II Warning */}
        {showExpertIIWarning && (
          <div className="p-3 bg-red-50 border border-red-300 rounded-md">
            <p className="text-sm text-red-800 font-medium">
              Warning: Expert II is extremely difficult!
            </p>
            <p className="text-xs text-red-700 mt-1">
              Every card has Peril, high boost icons, and punishing effects. Recommended only for experienced players.
            </p>
          </div>
        )}
      </div>

      {/* Additional Modular Sets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Modular Sets
        </label>
        <input
          type="number"
          min="0"
          max="6"
          value={additionalSetCount}
          onChange={(e) => setAdditionalSetCount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Recommended: 1-3 sets for standard difficulty
        </p>
      </div>

      {/* Randomization Options */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800">Randomization</h4>
        
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={randomizeHeroes}
            onChange={(e) => setRandomizeHeroes(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <span className="text-sm font-medium text-gray-700">
              Randomize Heroes
            </span>
            <p className="text-xs text-gray-500">
              Generate random hero lineup for all players
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={randomizeAspects}
            onChange={(e) => setRandomizeAspects(e.target.checked)}
            disabled={!randomizeHeroes}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
          />
          <div>
            <span className={`text-sm font-medium ${randomizeHeroes ? 'text-gray-700' : 'text-gray-400'}`}>
              Randomize Aspects
            </span>
            <p className="text-xs text-gray-500">
              Select random aspect(s) instead of using the aspect(s) in the hero's prebuilt deck.
            </p>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={excludeRecentlyPlayed}
            onChange={(e) => setExcludeRecentlyPlayed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Exclude Recently Played
              </span>
              {excludeRecentlyPlayed && (
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={excludeCount}
                  onChange={(e) => setExcludeCount(Number(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                  className="w-16 border border-gray-300 rounded px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <p className="text-xs text-gray-500">
              Avoid villains and heroes from your last {excludeCount} games
            </p>
          </div>
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-semibold text-lg transition-colors"
      >
        Generate Scenario
      </button>
    </div>
  );
}

export default GeneratorForm;