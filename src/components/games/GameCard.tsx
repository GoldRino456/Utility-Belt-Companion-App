import { GameLog, GameResult } from '../../types';
interface GameCardProperties {
    game: GameLog;
    onEdit: (game: GameLog) => void;
    onDelete: (id: string) => void;
}

function GameCard({ game, onEdit, onDelete }: GameCardProperties) {
    const isVictory = game.result === GameResult.VICTORY;
    const formattedDate = new Date(game.dateTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this game?')) {
            onDelete(game.id);
        }
    };

    const anyNemesisEncountered = game.players.some(p => p.nemesisEncountered);

    return (
        <div className={`border-l-4 rounded-lg shadow p-4 ${isVictory ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
            }`}>
            <div className="flex items-start justify-between gap-4">
                {/* Main Content */}
                <div className="flex-grow min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${isVictory
                                ? 'bg-green-600 text-white'
                                : 'bg-red-600 text-white'
                            }`}>
                            {game.result}
                        </span>
                        <span className="text-gray-600 text-sm">{formattedDate}</span>
                        {anyNemesisEncountered && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-purple-100 text-purple-700 font-medium">
                                Nemesis
                            </span>
                        )}
                    </div>

                    {/* Players */}
                    <div className="mb-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Players:</h4>
                        <div className="space-y-1">
                            {game.players.map((player, idx) => (
                                <div key={idx} className="text-sm text-gray-600">
                                    <span className="font-medium">{player.hero.name}</span>
                                    {player.hero.alterEgo && (
                                        <span className="text-gray-400 text-xs"> ({player.hero.alterEgo})</span>
                                    )}
                                    <span className="text-gray-500"> - {player.aspects.join(' + ')}</span>
                                    {player.playerName && (
                                        <span className="text-gray-400"> - {player.playerName}</span>
                                    )}
                                    {player.nemesisEncountered && (
                                        <span className="ml-2 text-purple-600">(Attacked by Nemesis: {player.hero.nemesis}!)</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Villain */}
                    <div className="mb-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Villain:</h4>
                        <div className="text-sm text-gray-600">
                            {game.villain.name}
                            <span className="text-gray-500 ml-2">
                                ({game.difficulty.standardSet}
                                {game.difficulty.expertSet !== 'None' && ` + ${game.difficulty.expertSet}`})
                            </span>
                        </div>
                    </div>

                    {/* Encounter Sets */}
                    {(game.requiredSets.length > 0 || game.additionalSets.length > 0) && (
                        <div className="mb-3">
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Encounter Sets:</h4>
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">Required:</span> {game.requiredSets.join(', ')}
                                {game.additionalSets.length > 0 && (
                                    <>
                                        <br />
                                        <span className="font-medium">Additional:</span> {game.additionalSets.join(', ')}
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    {game.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm text-gray-600 italic">{game.notes}</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                        onClick={() => onEdit(game)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameCard;