import { Product, ProductType, AspectType, StandardSet, ExpertSet, Hero, Villain } from '../types';

export const products: Product[] = [
    // ============================================================================
    // CORE SET
    // ============================================================================
    {
        id: 'core-set-2019',
        name: '2019 Core Set',
        type: ProductType.CORE_SET,
        releaseDate: '2019-11-01',
        heroes: [
            {
                name: 'Spider-Man',
                alterEgo: 'Peter Parker',
                nemesis: 'Vulture',
                prebuiltAspects: [AspectType.JUSTICE]
            },
            {
                name: 'Captain Marvel',
                alterEgo: 'Carol Danvers',
                nemesis: 'Yon-Rogg',
                prebuiltAspects: [AspectType.LEADERSHIP]
            },
            {
                name: 'She-Hulk',
                alterEgo: 'Jennifer Walters',
                nemesis: 'Titania',
                prebuiltAspects: [AspectType.AGGRESSION]
            },
            {
                name: 'Iron Man',
                alterEgo: 'Tony Stark',
                nemesis: 'Whiplash',
                prebuiltAspects: [AspectType.AGGRESSION]
            },
            {
                name: 'Black Panther',
                alterEgo: 'T’Challa',
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
        aspects: []
    },

    // ============================================================================
    // HERO PACKS
    // ============================================================================
    {
        id: 'cycle1-captain-america',
        name: 'Captain America Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2019-12-20',
        heroes: [
            {
                name: 'Captain America',
                alterEgo: 'Steve Rogers',
                nemesis: 'Baron Zemo',
                prebuiltAspects: [AspectType.LEADERSHIP]
            }
        ],
        villains: [],
        modularSets: [],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle1-ms-marvel',
        name: 'Ms. Marvel Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2019-12-20',
        heroes: [
            {
                name: 'Ms. Marvel',
                alterEgo: 'Kamala Khan',
                nemesis: 'Thomas Edison',
                prebuiltAspects: [AspectType.PROTECTION]
            }
        ],
        villains: [],
        modularSets: [],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle1-thor',
        name: 'Thor Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2020-03-06',
        heroes: [
            {
                name: 'Thor',
                alterEgo: 'Odinson',
                nemesis: 'Loki',
                prebuiltAspects: [AspectType.AGGRESSION]
            }
        ],
        villains: [],
        modularSets: [],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle1-black-widow',
        name: 'Black Widow Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2020-06-05',
        heroes: [
            {
                name: 'Black Widow',
                alterEgo: 'Natasha Romanoff',
                nemesis: 'Taskmaster',
                prebuiltAspects: [AspectType.JUSTICE]
            }
        ],
        villains: [],
        modularSets: [],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle1-doctor-strange',
        name: 'Doctor Strange Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2020-07-03',
        heroes: [
            {
                name: 'Doctor Strange',
                alterEgo: 'Stephen Strange',
                nemesis: 'Baron Mordo',
                prebuiltAspects: [AspectType.PROTECTION]
            }
        ],
        villains: [],
        modularSets: [],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle1-hulk',
        name: 'Hulk Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2020-08-07',
        heroes: [
            {
                name: 'Hulk',
                alterEgo: 'Bruce Banner',
                nemesis: 'Abomination',
                prebuiltAspects: [AspectType.AGGRESSION]
            }
        ],
        villains: [],
        modularSets: [],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle7-deadpool',
        name: 'Deadpool Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2023-11-17',
        heroes: [
            {
                name: 'Deadpool',
                alterEgo: 'Wade Wilson',
                nemesis: 'Butler',
                prebuiltAspects: [AspectType.POOL]
            }
        ],
        villains: [],
        modularSets: ["Dreadpool"],
        standardSets: [],
        expertSets: [],
        aspects: [AspectType.POOL]
    },

    // ============================================================================
    // SCENARIO PACKS
    // ============================================================================
    {
        id: 'cycle1-green-goblin',
        name: 'Green Goblin Scenario Pack',
        type: ProductType.SCENARIO_PACK,
        releaseDate: '2019-12-20',
        heroes: [],
        villains: [
            {
                name: 'Risky Business',
                requiredSets: ['Risky Business'],
                recommendedSets: ['Goblin Gimmicks']
            },
            {
                name: 'Mutagen Formula',
                requiredSets: ['Mutagen Formula'],
                recommendedSets: ['Goblin Gimmicks']
            }
        ],
        modularSets: ['Goblin Gimmicks', 'A Mess of Things', 'Power Drain', 'Running Interference'],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle1-the-wrecking-crew',
        name: 'The Wrecking Crew Scenario Pack',
        type: ProductType.SCENARIO_PACK,
        releaseDate: '2020-02-07',
        heroes: [],
        villains: [
            {
                name: 'Wrecking Crew',
                requiredSets: ['Wrecker', 'Thunderball', 'Piledriver', 'Bulldozer']
            }
        ],
        modularSets: [],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle4-the-hood',
        name: 'The Hood Scenario Pack',
        type: ProductType.SCENARIO_PACK,
        releaseDate: '2021-11-26',
        heroes: [],
        villains: [
            {
                name: 'The Hood',
                requiredSets: ['The Hood'],
                recommendedSets: [
                    'Streets of Mayhem',
                    'Brothers Grimm',
                    'Ransacked Armory',
                    'State of Emergency',
                    'Beasty Boys',
                    'Mister Hyde',
                    'Sinister Syndicate'
                ]
            }
        ],
        modularSets: [
            'Streets of Mayhem',
            'Brothers Grimm',
            'Ransacked Armory',
            'State of Emergency',
            'Beasty Boys',
            'Mister Hyde',
            'Sinister Syndicate',
            "Crossfire's Crew",
            'Wrecking Crew'
        ],
        standardSets: [StandardSet.STANDARD_II],
        expertSets: [ExpertSet.EXPERT_II],
        aspects: []
    },

    // ============================================================================
    // CAMPAIGN BOXES
    // ============================================================================
    {
        id: 'rise-of-red-skull',
        name: 'The Rise of Red Skull',
        type: ProductType.CAMPAIGN_BOX,
        releaseDate: '2020-09-04',
        heroes: [
            {
                name: 'Hawkeye',
                alterEgo: 'Clint Barton',
                nemesis: 'Crossfire',
                prebuiltAspects: [AspectType.LEADERSHIP]
            },
            {
                name: 'Spider-Woman',
                alterEgo: 'Jessica Drew',
                nemesis: 'The Viper',
                prebuiltAspects: [AspectType.JUSTICE, AspectType.AGGRESSION]
            }
        ],
        villains: [
            {
                name: 'Crossbones',
                requiredSets: ['Crossbones', 'Experimental Weapons'],
                recommendedSets: ['Hydra Patrol', 'Weapon Master', 'Legion of Hydra']
            },
            {
                name: 'Absorbing Man',
                requiredSets: ['Absorbing Man'],
                recommendedSets: ['Hydra Patrol']
            },
            {
                name: 'Taskmaster',
                requiredSets: ['Taskmaster', 'Hydra Patrol'],
                recommendedSets: ['Weapon Master']
            },
            {
                name: 'Zola',
                requiredSets: ['Zola'],
                recommendedSets: ['Under Attack']
            },
            {
                name: 'Red Skull',
                requiredSets: ['Red Skull'],
                recommendedSets: ['Hydra Assault', 'Hydra Patrol']
            }
        ],
        modularSets: [
            'Hydra Patrol',
            'Weapon Master',
            'Hydra Assault',
            'Experimental Weapons'
        ],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'age-of-apocalypse',
        name: 'Age of Apocalypse',
        type: ProductType.CAMPAIGN_BOX,
        releaseDate: '2024-03-29',
        heroes: [
            {
                name: 'Bishop',
                alterEgo: 'Lucas Bishop',
                nemesis: 'Trevor Fitzroy',
                prebuiltAspects: [AspectType.LEADERSHIP]
            },
            {
                name: 'Magik',
                alterEgo: 'Illyana Rasputin',
                nemesis: 'Belasco',
                prebuiltAspects: [AspectType.AGGRESSION]
            }
        ],
        villains: [
            {
                name: 'Unus',
                requiredSets: ['Unus', 'Infinites'],
                recommendedSets: ['Dystopian Nightmare']
            },
            {
                name: 'Four Horsemen',
                requiredSets: ['Four Horsemen'],
                recommendedSets: ['Dystopian Nightmare', 'Hounds']
            },
            {
                name: 'Apocalypse',
                requiredSets: ['Apocalypse', 'Prelates'],
                recommendedSets: ['Dark Riders', 'Infinites']
            },
            {
                name: 'Dark Beast',
                requiredSets: ['Dark Beast', 'Blue Moon', 'Genosha', 'Savage Land'],
                recommendedSets: ['Dystopian Nightmare']
            },
            {
                name: 'En Sabah Nur',
                requiredSets: ['En Sabah Nur'],
                recommendedSets: ['Celestial Tech', 'Clan Akkaba']
            }
        ],
        modularSets: [
            'Infinites',
            'Dystopian Nightmare',
            'Hounds',
            'Dark Riders',
            'Savage Land',
            'Genosha',
            'Blue Moon',
            'Celestial Tech',
            'Clan Akkaba',
            'Age of Apocalypse',
            'Prelates'
        ],
        standardSets: [StandardSet.STANDARD_III],
        expertSets: [],
        aspects: []
    }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all unique heroes from all products
 */
export function getAllHeroes(): Hero[] {
    const heroSet = new Set<Hero>();
    products.forEach(product => {
        product.heroes.forEach(hero => heroSet.add(hero));
    });
    return Array.from(heroSet).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all unique villains from all products
 */
export function getAllVillains(): Villain[] {
    const villainSet = new Set<Villain>();
    products.forEach(product => {
        product.villains.forEach(villain => villainSet.add(villain));
    });
    return Array.from(villainSet).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all unique modular encounter sets from all products
 */
export function getAllModularSets(): string[] {
    const setNames = new Set<string>();
    products.forEach(product => {
        product.modularSets.forEach(set => setNames.add(set));
    });
    return Array.from(setNames).sort();
}

/**
 * Get all available aspects from all products
 */
export function getAllAspects(): AspectType[] {
    const aspectSet = new Set<AspectType>();

    // Add base aspects
    aspectSet.add(AspectType.BASIC);
    aspectSet.add(AspectType.AGGRESSION);
    aspectSet.add(AspectType.JUSTICE);
    aspectSet.add(AspectType.LEADERSHIP);
    aspectSet.add(AspectType.PROTECTION);

    // Add any special aspects from products
    products.forEach(product => {
        product.aspects.forEach(aspect => aspectSet.add(aspect));
    });

    return Array.from(aspectSet);
}

/**
 * Find a product by ID
 */
export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

/**
 * Get hero by name (with nemesis info)
 */
export function getHeroByName(name: string): { hero: Hero; product: Product } | undefined {
    for (const product of products) {
        const hero = product.heroes.find(h => h.name === name);
        if (hero) {
            return {
                hero,
                product
            };
        }
    }
    return undefined;
}

/**
 * Get villain by name (with required sets)
 */
export function getVillainByName(name: string): { villain: Villain; product: Product } | undefined {
    for (const product of products) {
        const villain = product.villains.find(v => v.name === name);
        if (villain) {
            return {
                villain,
                product
            };
        }
    }
    return undefined;
}