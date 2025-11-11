import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from '../collection/ProductCard';
import { Product } from '../../types';
import "@testing-library/jest-dom";

const testProduct: Product = {
    id: 'core-set-2019',
    name: '2019 Core Set',
    type: ProductType.CORE_SET,
    releaseDate: '2019-11-01',
    heroes: [
                    {
                        id: 'core-set-2019-spider-man',
                        name: 'Spider-Man',
                        alterEgo: 'Peter Parker',
                        nemesis: 'Vulture',
                        prebuiltAspects: [AspectType.JUSTICE]
                    },
                    {
                        id: 'core-set-2019-captain-marvel',
                        name: 'Captain Marvel',
                        alterEgo: 'Carol Danvers',
                        nemesis: 'Yon-Rogg',
                        prebuiltAspects: [AspectType.LEADERSHIP]
                    },
                    {
                        id: 'core-set-2019-she-hulk',
                        name: 'She-Hulk',
                        alterEgo: 'Jennifer Walters',
                        nemesis: 'Titania',
                        prebuiltAspects: [AspectType.AGGRESSION]
                    },
                    {
                        id: 'core-set-2019-iron-man',
                        name: 'Iron Man',
                        alterEgo: 'Tony Stark',
                        nemesis: 'Whiplash',
                        prebuiltAspects: [AspectType.AGGRESSION]
                    },
                    {
                        id: 'core-set-2019-black-panther',
                        name: 'Black Panther',
                        alterEgo: 'T\'Challa',
                        nemesis: 'Killmonger',
                        prebuiltAspects: [AspectType.PROTECTION]
                    }
                ],
    villains: [
                {
                    name: 'Rhino',
                    requiredSets: ['Rhino'],
                    recommendedSets: ['Bomb Scare']
                },
                {
                    name: 'Klaw',
                    requiredSets: ['Klaw'],
                    recommendedSets: ['Masters of Evil']
                },
                {
                    name: 'Ultron',
                    requiredSets: ['Ultron'],
                    recommendedSets: ['Under Attack']
                }
            ],
    modularSets: [
                'Bomb Scare',
                'Masters of Evil',
                'Under Attack',
                'Legions of Hydra',
                'The Doomsday Chair'
            ],
    standardSets: [StandardSet.STANDARD],
    expertSets: [ExpertSet.EXPERT],
    aspects: [
                AspectType.BASIC,
                AspectType.AGGRESSION,
                AspectType.JUSTICE,
                AspectType.LEADERSHIP,
                AspectType.PROTECTION
    ]
};
const onToggleOwnershipTriggered = (productId: string) => { return productId; };

describe("<ProductCard />", () => {
    it('renders product information on screen', () => {
        render(<ProductCard
            product={testProduct}
            isOwned={false}
            onToggleOwnership={onToggleOwnershipTriggered}
        />);
        expect(screen.getByText("2019 Core Set")).toBeInTheDocument();
    })
});