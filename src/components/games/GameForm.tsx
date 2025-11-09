import { useState, useEffect } from 'react';
import { GameLog, Player, Product, AspectType, StandardSet, ExpertSet, GameResult, Villain, GeneratedScenario } from '../../types';
import { getVillainByName, getHeroById } from '../../data/products';

interface GameFormProperties {
    ownedProducts: Product[];
    allProducts: Product[];
    onSubmit: (game: Omit<GameLog, 'id'>) => Promise<void>;
    onCancel: () => void;
    existingGame?: GameLog;
    scenario?: GeneratedScenario;
}

function GameForm({ ownedProducts, allProducts, onSubmit, onCancel, existingGame, scenario}: GameFormProperties ) {
    const [dateTime, setDateTime] = useState('');
    const [playerCount, setPlayerCount] = useState(1);
    const [players, setPlayers] = useState<Player[]>([
        { playerName: '', hero: { id:'', name: '', alterEgo: '', nemesis: '' }, aspects: [], nemesisEncountered: false }
    ]);
    const [villain, setVillain] = useState<Villain>();
    const [standardSet, setStandardSet] = useState<StandardSet>(StandardSet.STANDARD);
    const [expertSet, setExpertSet] = useState<ExpertSet>(ExpertSet.NONE);
    const [additionalSets, setAdditionalSets] = useState<string[]>([]);
    const [result, setResult] = useState<GameResult>(GameResult.IN_PROGRESS);
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const ownedHeroes = ownedProducts.flatMap(p => p.heroes);
    const allHeroes = allProducts.flatMap(p => p.heroes);
    const ownedVillains = ownedProducts.flatMap(p => p.villains.map(v => v.name));
    const allVillains = allProducts.flatMap(p => p.villains.map(v => v.name));
    const ownedModularSets = ownedProducts.flatMap(p => p.modularSets);
    const availableAspects = ownedProducts.flatMap(p => p.aspects);

    const ownedStandardSets = [
        StandardSet.RANDOM,
        ...new Set(ownedProducts.flatMap(p => p.standardSets))
    ];
    const ownedExpertSets = [
        ExpertSet.NONE,
        ...new Set(ownedProducts.flatMap(p => p.expertSets))
    ];

    const tzOffset = new Date().getTimezoneOffset() * 60000;

    useEffect(() => {
        if (existingGame) {
            setDateTime(existingGame.dateTime);
            setPlayerCount(existingGame.players.length);
            setPlayers(existingGame.players);
            setVillain(existingGame.villain);
            setStandardSet(existingGame.difficulty.standardSet);
            setExpertSet(existingGame.difficulty.expertSet);
            setAdditionalSets(existingGame.additionalSets);
            setResult(existingGame.result);
            setNotes(existingGame.notes || '');
        }
        else if (scenario !== undefined) {
            setDateTime(new Date(Date.now() - tzOffset).toISOString().slice(0, 16));
            setVillain(scenario.villain);
            setStandardSet(scenario.difficulty.standardSet);
            setExpertSet(scenario.difficulty.expertSet);
            setAdditionalSets(scenario.additionalSets);

            if (scenario.players) {
                setPlayerCount(scenario.players.length);
                setPlayers(scenario.players);
            }
        }
        else {
        // Default to current date/time for new games
            setDateTime(new Date(Date.now() - tzOffset).toISOString().slice(0, 16));
        }
    }, [existingGame, tzOffset, scenario]);

    useEffect(() => {
        const currentPlayers = [...players];
        if (playerCount > currentPlayers.length) {
            // Add new players
            const newPlayers = Array(playerCount - currentPlayers.length).fill(null).map(() => ({
            playerName: '',
            hero: { id:'', name: '', alterEgo: '', nemesis: '' },
            aspects: [],
            nemesisEncountered: false
        }));
        setPlayers([...currentPlayers, ...newPlayers]);
        } 
        else if (playerCount < currentPlayers.length) {
        // Remove players
        setPlayers(currentPlayers.slice(0, playerCount));
        }
    }, [playerCount, players]);

    const updatePlayer = (index: number, field: keyof Player, value: string) => {
        const updated = [...players];
        if (field === 'hero') {
        // When updating hero, find the Hero object
        const heroId = value;
        const heroData = getHeroById(heroId);
        updated[index] = { 
            ...updated[index], 
            hero: heroData ? heroData.hero : {id:'', name: 'Error fetching hero data.', alterEgo:'', nemesis: '' }
        };
        } 
        else {
        updated[index] = { ...updated[index], [field]: value };
        }
        setPlayers(updated);
    };

    const toggleAdditionalSet = (setName: string) => {
        if (additionalSets.includes(setName)) {
            setAdditionalSets(additionalSets.filter(s => s !== setName));
        } 
        else {
            setAdditionalSets([...additionalSets, setName]);
        }
    };

    const toggleAvailableAspect = (player: Player, index: number, aspect: AspectType) => {
        if (player.aspects.some(a => a === aspect)) {
            const newAspects = player.aspects.filter(a => a !== aspect);
            updatePlayer(index, 'aspects', newAspects);
            return;
        }
        else {
            const newAspects = [...player.aspects, aspect];
            updatePlayer(index, 'aspects', newAspects);
            return;
        }
    }

    const requiredSets = villain ? (villain.requiredSets || []) : [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

    // Validation
    if (!villain) {
      alert('Please select a villain');
      return;
    }
    if (players.some(p => !p.hero.name)) {
      alert('Please select a hero for each player');
      return;
        }

    setSubmitting(true);
    try {
      const gameData: Omit<GameLog, 'id'> = {
        dateTime,
        players,
        villain,
        difficulty: {
          standardSet,
          expertSet
        },
        requiredSets,
        additionalSets,
        result,
        notes: notes.trim() || undefined
      };

      await onSubmit(gameData);
    } catch (error) {
      console.error('Failed to submit game:', error);
      alert('Failed to save game. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          <h3 className="text-xl font-bold text-gray-800">
              {existingGame ? 'Edit Game' : 'Add New Game'}
          </h3>

          {/* Date/Time */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time
              </label>
              <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
              />
          </div>

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

          {/* Players */}
          <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Players</h4>
              {players.map((player, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-md space-y-3">
                      <h5 className="font-medium text-gray-700">Player {index + 1}</h5>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Player Name */}
                          <div>
                              <label className="block text-sm text-gray-600 mb-1">
                                  Name (optional)
                              </label>
                              <input
                                  type="text"
                                  value={player.playerName}
                                  onChange={(e) => updatePlayer(index, 'playerName', e.target.value)}
                                  placeholder={`Player ${index + 1}`}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                          </div>

                          {/* Hero */}
                          <div>
                              <label className="block text-sm text-gray-600 mb-1">
                                  Hero *
                              </label>
                              <select
                                  value={player.hero.id}
                                  onChange={(e) => updatePlayer(index, 'hero', e.target.value)}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  required
                              >
                                  <option value="">Select Hero</option>
                                  <optgroup label="Owned Heroes">
                                      {ownedHeroes.map(hero => (
                                          <option key={hero.id} value={hero.id}>{hero.name + " (" + hero.alterEgo + ")"}</option>
                                      ))}
                                  </optgroup>
                                  {allHeroes.filter(h => !ownedHeroes.some(oh => oh.id === h.id)).length > 0 && (
                                      <optgroup label="Other Heroes">
                                          {allHeroes.filter(h => !ownedHeroes.some(oh => oh.id === h.id)).map(hero => (
                                              <option key={hero.id} value={hero.id} className="text-gray-400">{hero.name + " (" + hero.alterEgo + ")"}</option>
                                          ))}
                                      </optgroup>
                                  )}
                              </select>
                              {player.hero.name && (
                                  <p className="text-xs text-gray-500 mt-1">
                                      Nemesis: {player.hero.nemesis}
                                  </p>
                              )}
                          </div>

                          {/* Aspects */}
                          {availableAspects.length > 0 && (
                              <div>
                                  <label className="block text-sm text-gray-600 mb-1">
                                      Aspects *
                                  </label>
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-300 rounded-md">
                                      {availableAspects
                                          .map(set => (
                                              <label key={set} className="flex items-center gap-2 cursor-pointer text-sm">
                                                  <input
                                                      type="checkbox"
                                                      checked={player.aspects.includes(set)}
                                                      onChange={() => toggleAvailableAspect(player, index, set)}
                                                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                  />
                                                  <span className="text-gray-700">{set}</span>
                                              </label>
                                          ))}
                                  </div>
                              </div>
                          )}

                          {/* Nemesis Encountered */}
                          <div className="flex items-center">
                              <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                      type="checkbox"
                                      checked={player.nemesisEncountered}
                                      onChange={(e) => updatePlayer(index, 'nemesisEncountered', e.target.checked)}
                                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">Nemesis encountered</span>
                              </label>
                          </div>
                      </div>
                  </div>
              ))}
          </div>

          {/* Villain */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                  Villain *
              </label>
              <select
                  value={villain?.name}
                  onChange={(e) => setVillain(getVillainByName(e.target.value)?.villain)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
              >
                  <option value="">Select Villain</option>
                  <optgroup label="Owned Villains">
                      {ownedVillains.map(v => (
                          <option key={v} value={v}>{v}</option>
                      ))}
                  </optgroup>
                  {allVillains.filter(v => !ownedVillains.includes(v)).length > 0 && (
                      <optgroup label="Other Villains">
                          {allVillains.filter(v => !ownedVillains.includes(v)).map(v => (
                              <option key={v} value={v} className="text-gray-400">{v}</option>
                          ))}
                      </optgroup>
                  )}
              </select>
          </div>

          {/* Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Required Sets (Read-only) */}
          {requiredSets.length > 0 && (
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                      Required Encounter Sets
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700">
                      {requiredSets.join(', ')}
                  </div>
              </div>
          )}

          {/* Additional Sets */}
          {ownedModularSets.length > 0 && (
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Modular Sets
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-300 rounded-md">
                      {ownedModularSets.sort()
                          .filter(set => !requiredSets.includes(set))
                          .map(set => (
                              <label key={set} className="flex items-center gap-2 cursor-pointer text-sm">
                                  <input
                                      type="checkbox"
                                      checked={additionalSets.includes(set)}
                                      onChange={() => toggleAdditionalSet(set)}
                                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-gray-700">{set}</span>
                              </label>
                          ))}
                  </div>
              </div>
          )}

          {/* Result */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                  Result
              </label>
              <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input
                          type="radio"
                          name="result"
                          value={GameResult.IN_PROGRESS}
                          checked={result === GameResult.IN_PROGRESS}
                          onChange={(e) => setResult(e.target.value as GameResult)}
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">In-Progress</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input
                          type="radio"
                          name="result"
                          value={GameResult.VICTORY}
                          checked={result === GameResult.VICTORY}
                          onChange={(e) => setResult(e.target.value as GameResult)}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-700">Victory</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input
                          type="radio"
                          name="result"
                          value={GameResult.DEFEAT}
                          checked={result === GameResult.DEFEAT}
                          onChange={(e) => setResult(e.target.value as GameResult)}
                          className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-gray-700">Defeat</span>
                  </label>
              </div>
          </div>

          {/* Notes */}
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
              </label>
              <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Any additional notes about this game..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
              <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-medium"
              >
                  {submitting ? 'Saving...' : existingGame ? 'Update Game' : 'Add Game'}
              </button>
              <button
                  type="button"
                  onClick={onCancel}
                  disabled={submitting}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 disabled:bg-gray-100 font-medium"
              >
                  Cancel
              </button>
          </div>
      </form>
  );
}

export default GameForm;
