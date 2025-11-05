import { GeneratedScenario, GeneratorConfig } from '../../types';

interface ScenarioDisplayProperties {
  scenario: GeneratedScenario;
  config: GeneratorConfig;
    onRerollAll: () => void;
    onRerollHeroes: () => void;
  onRerollVillain: () => void;
  onRerollSets: () => void;
  onSaveToLog: () => void;
}

function ScenarioDisplay({
  scenario,
  config,
    onRerollAll,
  onRerollHeroes,
  onRerollVillain,
  onRerollSets,
  onSaveToLog
}: ScenarioDisplayProperties) {
  const difficultyText = scenario.difficulty.expertSet !== 'None'
    ? `${scenario.difficulty.standardSet} + ${scenario.difficulty.expertSet}`
    : scenario.difficulty.standardSet;

    return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6">
        <h3 className="text-2xl font-bold mb-2">Generated Scenario</h3>
        <p className="text-red-100">Ready to play!</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Villain */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Villain
          </h4>
          <div className="text-3xl font-bold text-gray-900">{scenario.villain.name}</div>
        </div>

        {/* Difficulty */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Difficulty
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
              {scenario.difficulty.standardSet}
            </span>
            {scenario.difficulty.expertSet !== 'None' && (
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                {scenario.difficulty.expertSet}
              </span>
            )}
          </div>
        </div>

        {/* Required Encounter Sets */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Required Encounter Sets
          </h4>
          <div className="flex flex-wrap gap-2">
            {scenario.requiredSets.map((set, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-sm"
              >
                {set}
              </span>
            ))}
          </div>
        </div>

        {/* Additional Modular Sets */}
        {scenario.additionalSets.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Additional Modular Sets
            </h4>
            <div className="flex flex-wrap gap-2">
              {scenario.additionalSets.map((set, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm font-medium"
                >
                  {set}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Hero Lineup */}
        {scenario.players && scenario.players.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Hero Lineup
            </h4>
            <div className="space-y-2">
              {scenario.players.map((player, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
                >
                  <div className="font-semibold text-gray-900">
                    Player {idx + 1}: {player.hero.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Aspects: {player.aspects.join(' + ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-3">
                <div className={`${(!scenario.players || scenario.players.length === 0 ? "md:grid-cols-3" : "md:grid-cols-4")}
                grid grid-cols-1 gap-3`}>
          <button
            onClick={onRerollAll}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium transition-colors"
          >
            Re-roll All
          </button>
          <button
            onClick={onRerollVillain}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium transition-colors"
          >
            Re-roll Villain
          </button>
          <button
            onClick={onRerollHeroes}
            className={`${(!scenario.players || scenario.players.length === 0 ? "hidden" : "")}
            px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium transition-colors`}
          >
            Re-roll Heroes
          </button>
          <button
            onClick={onRerollSets}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium transition-colors"
          >
            Re-roll Sets
          </button>
        </div>
        
        <button
          onClick={onSaveToLog}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold text-lg transition-colors"
        >
          Save to Game Log
        </button>
      </div>
    </div>
  );
}

export default ScenarioDisplay;
