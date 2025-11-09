import { useState } from 'react';
import { GetColorMapForAspect, Product } from '../../types';

interface ProductCardProperties {
    product: Product;
    isOwned: boolean;
    onToggleOwnership: (productId: string) => void;
}

function ProductCard({ product, isOwned, onToggleOwnership }: ProductCardProperties) {
    const [isExpanded, setIsExpanded] = useState(false);

    const hasContent =
        product.heroes.length > 0 ||
        product.villains.length > 0 ||
        product.modularSets.length > 0 ||
        product.standardSets.length > 0 ||
        product.expertSets.length > 0 ||
        product.aspects.length > 0;

    return (
        <div className={`border rounded-lg p-4 transition-colors ${isOwned ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-300'
            }`}>
            <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="flex-shrink-0 pt-1">
                    <input
                        type="checkbox"
                        checked={isOwned}
                        onChange={() => onToggleOwnership(product.id)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        id={`product-${product.id}`}
                    />
                </div>

                {/* Product Info */}
                <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                            <label
                                htmlFor={`product-${product.id}`}
                                className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                            >
                                {product.name}
                            </label>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-200 text-gray-700">
                                    {product.type}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {new Date(product.releaseDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short'
                                    })}
                                </span>
                            </div>
                        </div>

                        {/* Expand/Collapse Button */}
                        {hasContent && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                            >
                                <svg
                                    className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && hasContent && (
                        <div className="mt-4 space-y-3 text-sm">
                            {/* Heroes */}
                            {product.heroes.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-1">Heroes:</h4>
                                    <div className="ml-4 space-y-1">
                                        {product.heroes.map((hero, idx) => (
                                            <div key={idx} className="text-gray-600">
                                                <span className="font-medium">{hero.name}</span>
                                                {hero.alterEgo && (
                                                    <span className="text-gray-400 text-xs"> ({hero.alterEgo})</span>
                                                )}
                                                <br></br>
                                                <span className="ml-4">Nemesis: {
                                                    <span className="px-2 py-0.5 rounded text-xs text-red-700">
                                                        {hero.nemesis}
                                                    </span>
                                                }
                                                </span>
                                                {hero.prebuiltAspects && hero.prebuiltAspects.length > 0 && (
                                                    <div className="ml-4 mt-0.5 flex flex-wrap gap-1">
                                                        Prebuilt Deck Aspects: 
                                                        {hero.prebuiltAspects.map((aspect, aIdx) => (
                                                            <span
                                                                key={aIdx}
                                                                className={`px-2 py-0.5 rounded text-xs ${
                                                                    GetColorMapForAspect(aspect)
                                                                }`}
                                                            >
                                                                {aspect}
                                                                
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Villains */}
                            {product.villains.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-1">Villains:</h4>
                                    <div className="ml-4 space-y-1">
                                        {product.villains.map((villain, idx) => (
                                            <div key={idx} className="text-gray-600">
                                                <span className="font-medium">{villain.name}</span>
                                                <div className="ml-4 text-xs text-gray-500">
                                                    Required Sets: {villain.requiredSets.join(', ')}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Modular Sets */}
                            {product.modularSets.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-1">Modular Encounter Sets:</h4>
                                    <div className="ml-4 text-gray-600">
                                        {product.modularSets.join(', ')}
                                    </div>
                                </div>
                            )}

                            {/* Standard/Expert Sets */}
                            {(product.standardSets.length > 0 || product.expertSets.length > 0) && (
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-1">Difficulty Sets:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.standardSets.map((set, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 rounded text-xs bg-green-100 text-green-700 font-medium"
                                            >
                                                {set}
                                            </span>
                                        ))}
                                        {product.expertSets.map((set, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 rounded text-xs bg-red-100 text-red-700 font-medium"
                                            >
                                                {set}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Aspects */}
                            {product.aspects.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-700 mb-1">New Aspects:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.aspects.map((aspect, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-700 font-medium"
                                            >
                                                {aspect}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;