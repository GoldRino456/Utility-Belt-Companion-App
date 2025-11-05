import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGenerator } from '../hooks/useGenerator';
import GeneratorForm from '../components/generator/GeneratorForm';
import ScenarioDisplay from '../components/generator/ScenarioDisplay';
import { GeneratedScenario, GeneratorConfig } from '../types';

function Generator() {
  const navigate = useNavigate();
  const { ownedProducts, generateScenario, loading, error } = useGenerator();
  
  const [scenario, setScenario] = useState<GeneratedScenario | null>(null);
  const [currentConfig, setCurrentConfig] = useState<GeneratorConfig | null>(null);

  const handleGenerate = (config: GeneratorConfig) => {
    const generated = generateScenario(config);
    if (generated) {
      setScenario(generated);
      setCurrentConfig(config);
    }
  };

  const handleRerollAll = () => {
    if (currentConfig) {
      handleGenerate(currentConfig);
    }
    };

    const handleRerollHeroes = () => {
        if (currentConfig && scenario) {
            const newScenario = generateScenario(currentConfig);
            if (newScenario) {
                setScenario({
                    ...scenario,
                    players: newScenario.players
                });
            }
        }
    }

  const handleRerollVillain = () => {
    if (currentConfig) {
      // Generate new scenario with same config (will get different villain due to randomness)
      const newScenario = generateScenario(currentConfig);
      if (newScenario) {
        // Keep the same additional sets if possible and heroes
        setScenario({
            ...newScenario,
            additionalSets: scenario?.additionalSets || newScenario.additionalSets,
            players: scenario?.players
        });
      }
    }
  };

  const handleRerollSets = () => {
    if (currentConfig && scenario) {
      // Generate new scenario to get different modular sets
      const newScenario = generateScenario(currentConfig);
      if (newScenario) {
        // Keep same villain and heroes, just change modular sets
        setScenario({
          ...scenario,
          additionalSets: newScenario.additionalSets
        });
      }
    }
  };

  const handleSaveToLog = () => {
    // Navigate to game log with scenario data in state
    navigate('/games', { state: { generatedScenario: scenario } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (ownedProducts.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h3 className="text-yellow-800 font-semibold mb-2">No Products Owned</h3>
        <p className="text-yellow-700 mb-4">
          You need to mark some products as owned in your collection before you can generate scenarios.
        </p>
        <button
          onClick={() => navigate('/collection')}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 font-medium"
        >
          Go to Collection
        </button>
      </div>
    );
  }

return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Random Scenario Generator</h2>
        <p className="text-gray-600 mt-1">
          Generate random Marvel Champions scenarios from your owned content
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-6">
          <p className="text-red-800 font-semibold">Error</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Form */}
        <div>
          <GeneratorForm
            ownedProducts={ownedProducts}
            onGenerate={handleGenerate}
          />
        </div>

        {/* Generated Scenario Display */}
        <div>
          {scenario ? (
            <ScenarioDisplay
              scenario={scenario}
              config={currentConfig!}
              onRerollAll={handleRerollAll}
              onRerollHeroes={handleRerollHeroes}
              onRerollVillain={handleRerollVillain}
              onRerollSets={handleRerollSets}
              onSaveToLog={handleSaveToLog}
            />
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-24 h-24 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">
                Configure your preferences and click<br />
                <span className="font-semibold">"Generate Scenario"</span> to begin
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Generator;