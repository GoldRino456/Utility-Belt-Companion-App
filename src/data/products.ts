import { Product, ProductType, AspectType, StandardSet, ExpertSet, Hero, Villain } from '../types';
import { MojoManiaModule } from '../data/generatorModules';


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
        ]},

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
                id: 'cycle1-captain-america',
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
                id: 'cycle1-ms-marvel',
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
                id: 'cycle1-thor',
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
                id: 'cycle1-black-widow',
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
                id: 'cycle1-doctor-strange',
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
                id: 'cycle1-hulk',
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
        id: 'cycle2-ant-man',
        name: 'Ant-Man Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2020-11-06',
        heroes: [
            {
                id: 'cycle2-ant-man',
                name: 'Ant-Man',
                alterEgo: 'Scott Lang',
                nemesis: 'Yellowjacket',
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
        id: 'cycle2-wasp',
        name: 'Wasp Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2021-01-22',
        heroes: [
            {
                id: 'cycle2-wasp',
                name: 'Wasp',
                alterEgo: 'Nadia Van Dyne',
                nemesis: 'Beetle',
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
        id: 'cycle2-quicksilver',
        name: 'Quicksilver Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2021-02-05',
        heroes: [
            {
                id: 'cycle2-quicksilver',
                name: 'Quicksilver',
                alterEgo: 'Pietro Maximoff',
                nemesis: 'Avalanche',
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
        id: 'cycle2-scarlet-witch',
        name: 'Scarlet Witch Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2021-03-05',
        heroes: [
            {
                id: 'cycle2-scarlet-witch',
                name: 'Scarlet Witch',
                alterEgo: 'Wanda Maximoff',
                nemesis: 'Luminous',
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
        id: 'cycle3-star-lord',
        name: 'Star-Lord Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2021-05-14',
        heroes: [
            {
                id: 'cycle3-star-lord',
                name: 'Star-Lord',
                alterEgo: 'Peter Quill',
                nemesis: 'Mister Knife',
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
        id: 'cycle3-gamora',
        name: 'Gamora Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2021-05-14',
        heroes: [
            {
                id: 'cycle3-gamora',
                name: 'Gamora',
                alterEgo: 'Gamora',
                nemesis: 'Nebula',
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
        id: 'cycle3-drax',
        name: 'Drax Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2021-06-18',
        heroes: [
            {
                id: 'cycle3-drax',
                name: 'Drax',
                alterEgo: 'Drax',
                nemesis: 'Yotat The Destroyer',
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
        id: 'cycle3-venom',
        name: 'Venom Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2021-07-16',
        heroes: [
            {
                id: 'cycle3-venom',
                name: 'Venom',
                alterEgo: 'Flash Thompson',
                nemesis: 'Enraged Symbiotes',
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
        id: 'cycle4-nebula',
        name: 'Nebula Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2021-09-17',
        heroes: [
            {
                id: 'cycle4-nebula',
                name: 'Nebula',
                alterEgo: 'Nebula',
                nemesis: 'Gamora',
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
        id: 'cycle4-war-machine',
        name: 'War Machine Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2021-11-12',
        heroes: [
            {
                id: 'cycle4-war-machine',
                name: 'War Machine',
                alterEgo: 'James Rhodes',
                nemesis: 'Living Laser',
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
        id: 'cycle4-valkyrie',
        name: 'Valkyrie Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2022-01-21',
        heroes: [
            {
                id: 'cycle4-valkyrie',
                name: 'Valkyrie',
                alterEgo: 'Brunnhilde',
                nemesis: 'Enchantress',
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
        id: 'cycle4-vison',
        name: 'Vison Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2022-01-14',
        heroes: [
            {
                id: 'cycle4-vison',
                name: 'Vison',
                alterEgo: 'Vison',
                nemesis: 'Ultron',
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
        id: 'cycle5-nova',
        name: 'Nova Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2022-05-20',
        heroes: [
            {
                id: 'cycle5-nova',
                name: 'Nova',
                alterEgo: 'Sam Alexander',
                nemesis: 'Warbringer',
                prebuiltAspects: [AspectType.AGGRESSION]
            }
        ],
        villains: [],
        modularSets: ["Armadillo"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle5-ironheart',
        name: 'Ironheart Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2022-05-20',
        heroes: [
            {
                id: 'cycle5-ironheart',
                name: 'Ironheart',
                alterEgo: 'Riri Williams',
                nemesis: 'Lucia von Bardas',
                prebuiltAspects: [AspectType.LEADERSHIP]
            }
        ],
        villains: [],
        modularSets: ["Zzzax"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle5-spider-ham',
        name: 'Spider-Ham Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2022-07-15',
        heroes: [
            {
                id: 'cycle5-spider-ham',
                name: 'Spider-Ham',
                alterEgo: 'Peter Porker',
                nemesis: 'The Green Gobbler',
                prebuiltAspects: [AspectType.JUSTICE]
            }
        ],
        villains: [],
        modularSets: ["The Inheritors"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle5-sp//dr',
        name: 'SP//dr Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2022-07-15',
        heroes: [
            {
                id: 'cycle5-sp//dr',
                name: 'SP//dr',
                alterEgo: 'Peni Parker',
                nemesis: 'M.O.R.B.I.U.S.',
                prebuiltAspects: [AspectType.PROTECTION]
            }
        ],
        villains: [],
        modularSets: ["Iron Spider's Sinister Six"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle6-cyclops',
        name: 'Cyclops Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2022-09-30',
        heroes: [
            {
                id: 'cycle6-cyclops',
                name: 'Cyclops',
                alterEgo: 'Scott Summers',
                nemesis: 'Mister Sinister',
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
        id: 'cycle6-phoenix',
        name: 'Phoenix Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2022-09-30',
        heroes: [
            {
                id: 'cycle6-phoenix',
                name: 'Phoenix',
                alterEgo: 'Jean Grey',
                nemesis: 'Dark Phoenix',
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
        id: 'cycle6-wolverine',
        name: 'Wolverine Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2022-11-11',
        heroes: [
            {
                id: 'cycle6-wolverine',
                name: 'Wolverine',
                alterEgo: 'Logan',
                nemesis: 'Omega Red',
                prebuiltAspects: [AspectType.AGGRESSION]
            }
        ],
        villains: [],
        modularSets: ["Deathstrike"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle6-storm',
        name: 'Storm Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2022-11-11',
        heroes: [
            {
                id: 'cycle6-storm',
                name: 'Storm',
                alterEgo: 'Ororo Munroe',
                nemesis: 'Callisto',
                prebuiltAspects: [AspectType.LEADERSHIP]
            }
        ],
        villains: [],
        modularSets: ["Shadow King"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle6-gambit',
        name: 'Gambit Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2023-02-24',
        heroes: [
            {
                id: 'cycle6-gambit',
                name: 'Gambit',
                alterEgo: 'Remy LeBeau',
                nemesis: 'Belladonna',
                prebuiltAspects: [AspectType.JUSTICE]
            }
        ],
        villains: [],
        modularSets: ["Exodus"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle6-rogue',
        name: 'Rogue Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2023-02-24',
        heroes: [
            {
                id: 'cycle6-rogue',
                name: 'Rogue',
                alterEgo: 'Anna Marie',
                nemesis: 'Mystique',
                prebuiltAspects: [AspectType.PROTECTION]
            }
        ],
        villains: [],
        modularSets: ["Reavers"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle7-psylocke',
        name: 'Psylocke Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2023-09-22',
        heroes: [
            {
                id: 'cycle7-psylocke',
                name: 'Psylocke',
                alterEgo: 'Betsy Braddock',
                nemesis: 'Chimera',
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
        id: 'cycle7-angel',
        name: 'Angel Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2023-09-22',
        heroes: [
            {
                id: 'cycle7-angel',
                name: 'Angel',
                alterEgo: 'Warren Worthington III',
                nemesis: 'Harpoon',
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
        id: 'cycle7-x-23',
        name: 'X-23 Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2023-11-17',
        heroes: [
            {
                id: 'cycle7-x-23',
                name: 'X-23',
                alterEgo: 'Laura Kinney',
                nemesis: 'Lady Deathstrike',
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
                id: 'cycle7-deadpool',
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
    {
        id: 'cycle8-iceman',
        name: 'Iceman Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2024-05-17',
        heroes: [
            {
                id: 'cycle8-iceman',
                name: 'Iceman',
                alterEgo: 'Bobby Drake',
                nemesis: 'Pyro',
                prebuiltAspects: [AspectType.AGGRESSION]
            }
        ],
        villains: [],
        modularSets: ["Sauron"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle8-jubilee',
        name: 'Jubilee Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2024-07-19',
        heroes: [
            {
                id: 'cycle8-jubilee',
                name: 'Jubilee',
                alterEgo: 'Jubilation Lee',
                nemesis: 'Nanny',
                prebuiltAspects: [AspectType.JUSTICE]
            }
        ],
        villains: [],
        modularSets: ["Arcade"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle8-nightcrawler',
        name: 'Nightcrawler Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2024-09-20',
        heroes: [
            {
                id: 'cycle8-nightcrawler',
                name: 'Nightcrawler',
                alterEgo: 'Kurt Wagner',
                nemesis: 'Azazel',
                prebuiltAspects: [AspectType.PROTECTION]
            }
        ],
        villains: [],
        modularSets: ["Crazy Gang"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle8-magneto',
        name: 'Magneto Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2024-11-15',
        heroes: [
            {
                id: 'cycle8-magneto',
                name: 'Magneto',
                alterEgo: 'Erik Lehnsherr',
                nemesis: 'Exodus',
                prebuiltAspects: [AspectType.LEADERSHIP]
            }
        ],
        villains: [],
        modularSets: ["Hellfire"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle9-black-panther',
        name: 'Black Panther Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2025-05-02',
        heroes: [
            {
                id: 'cycle9-black-panther',
                name: 'Black Panther',
                alterEgo: 'Shuri',
                nemesis: 'Klaw',
                prebuiltAspects: [AspectType.JUSTICE]
            }
        ],
        villains: [],
        modularSets: ["Extreme Risk"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle9-silk',
        name: 'Silk Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2025-05-02',
        heroes: [
            {
                id: 'cycle9-silk',
                name: 'Silk',
                alterEgo: 'Cindy Moon',
                nemesis: 'Morlun',
                prebuiltAspects: [AspectType.PROTECTION]
            }
        ],
        villains: [],
        modularSets: ["Growing Strong"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle9-falcon',
        name: 'Falcon Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2025-06-20',
        heroes: [
            {
                id: 'cycle9-falcon',
                name: 'Falcon',
                alterEgo: 'Sam Wilson',
                nemesis: 'Viper',
                prebuiltAspects: [AspectType.LEADERSHIP]
            }
        ],
        villains: [],
        modularSets: ["Techno"],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle9-winter-soldier',
        name: 'Winter Soldier Hero Pack',
        type: ProductType.HERO_PACK,
        releaseDate: '2025-06-20',
        heroes: [
            {
                id: 'cycle9-winter-soldier',
                name: 'Winter Soldier',
                alterEgo: 'Bucky Barnes',
                nemesis: 'Crossbones',
                prebuiltAspects: [AspectType.AGGRESSION]
            }
        ],
        villains: [],
        modularSets: ["Whiteout"],
        standardSets: [],
        expertSets: [],
        aspects: []
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
        id: 'cycle2-the-once-and-future-kang',
        name: 'The Once and Future Kang Scenario Pack',
        type: ProductType.SCENARIO_PACK,
        releaseDate: '2020-10-02',
        heroes: [],
        villains: [
            {
                name: 'Kang',
                requiredSets: ['Kang'],
                recommendedSets: ['Temporal']
            }
        ],
        modularSets: [
            'Temporal',
            'Anachronauts',
            'Master of Time'
        ],
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
    {
        id: 'cycle6-mojo-mania',
        name: 'Mojo Mania Scenario Pack',
        type: ProductType.SCENARIO_PACK,
        releaseDate: '2022-11-11',
        heroes: [],
        villains: [
            {
                name: 'MaGog',
                requiredSets: ['Magog'],
                generatorModule: MojoManiaModule
            },
            {
                name: 'Spiral',
                requiredSets: ['Spiral'],
                generatorModule: MojoManiaModule
            },
            {
                name: 'Mojo',
                requiredSets: ['Mojo'],
                generatorModule: MojoManiaModule
            }
        ],
        modularSets: [
            'Crime',
            'Fantasy',
            'Horror',
            'Sci-Fi',
            'Sitcom',
            'Western',
            'Longshot'
        ],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'cycle9-trickster-takeover',
        name: 'Trickster Takeover Scenario Pack',
        type: ProductType.SCENARIO_PACK,
        releaseDate: '2025-08-15',
        heroes: [],
        villains: [
            {
                name: 'Enchantress',
                requiredSets: ['Enchantress'],
                recommendedSets: [
                    'Trickster Magic'
                ]
            },
            {
                name: 'Loki, God of Lies',
                requiredSets: ['God of Lies'],
                recommendedSets: [
                    'Trickster Magic'
                ]
            }
        ],
        modularSets: [
            'Trickster Magic'
        ],
        standardSets: [],
        expertSets: [],
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
                id: 'rise-of-red-skull-hawkeye',
                name: 'Hawkeye',
                alterEgo: 'Clint Barton',
                nemesis: 'Crossfire',
                prebuiltAspects: [AspectType.LEADERSHIP]
            },
            {
                id: 'rise-of-red-skull-spider-woman',
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
        id: 'galaxys-most-wanted',
        name: "Galaxy's Most Wanted",
        type: ProductType.CAMPAIGN_BOX,
        releaseDate: '2021-04-02',
        heroes: [
            {
                id: 'galaxys-most-wanted-groot',
                name: 'Groot',
                alterEgo: 'Groot',
                nemesis: 'Furnax',
                prebuiltAspects: [AspectType.PROTECTION]
            },
            {
                id: 'galaxys-most-wanted-rocket-raccoon',
                name: 'Rocket Raccoon',
                alterEgo: 'Rocket Raccoon',
                nemesis: "Blackjack O'Hare",
                prebuiltAspects: [AspectType.AGGRESSION]
            }
        ],
        villains: [
            {
                name: 'Brotherhood of Badoon',
                requiredSets: ['Brotherhood of Badoon', 'Ship Command'],
                recommendedSets: ['Band of Badoon']
            },
            {
                name: 'Collector, Infiltrate the Museum',
                requiredSets: ['Infiltrate the Museum', 'Galactic Artifacts'],
                recommendedSets: ['Menagerie Medley']
            },
            {
                name: 'Collector, Escape the Museum',
                requiredSets: ['Escape the Museum', 'Galactic Artifacts', 'Ship Command'],
                recommendedSets: ['Menagerie Medley']
            },
            {
                name: 'Nebula',
                requiredSets: ['Nebula', 'Power Stone', 'Ship Command'],
                recommendedSets: ['Space Pirates']
            },
            {
                name: 'Ronan the Accuser',
                requiredSets: ['Ronan the Accuser', 'Power Stone', 'Ship Command'],
                recommendedSets: ['Kree Militants']
            }
        ],
        modularSets: [
            'Band of Badoon',
            'Galactic Artifacts',
            'Kree Militants',
            'Menagerie Medley',
            'Space Pirates',
            'Badoon Headhunter',
            'Ship Command',
            'Power Stone'
        ],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'the-mad-titans-shadow',
        name: "The Mad Titan's Shadow",
        type: ProductType.CAMPAIGN_BOX,
        releaseDate: '2021-10-29',
        heroes: [
            {
                id: 'the-mad-titans-shadow-spectrum',
                name: 'Spectrum',
                alterEgo: 'Monica Rambeau',
                nemesis: 'Radioactive Man',
                prebuiltAspects: [AspectType.LEADERSHIP]
            },
            {
                id: 'the-mad-titans-shadow-adam-warlock',
                name: 'Adam Warlock',
                alterEgo: 'Adam Warlock',
                nemesis: "The Magus",
                prebuiltAspects: [
                    AspectType.AGGRESSION,
                    AspectType.JUSTICE,
                    AspectType.LEADERSHIP,
                    AspectType.PROTECTION]
            }
        ],
        villains: [
            {
                name: 'Ebony Maw',
                requiredSets: ['Ebony Maw'],
                recommendedSets: ['The Black Order', 'Armies of Titan']
            },
            {
                name: 'Tower Defense',
                requiredSets: ['Tower Defense'],
                recommendedSets: ['Armies of Titan']
            },
            {
                name: 'Thanos',
                requiredSets: ['Thanos', 'Infinity Gauntlet'],
                recommendedSets: ['The Black Order', 'Children of Thanos']
            },
            {
                name: 'Hela',
                requiredSets: ['Hela'],
                recommendedSets: ['Legions of Hel', 'Frost Giants']
            },
            {
                name: 'Loki',
                requiredSets: ['Loki', 'Infinity Gauntlet'],
                recommendedSets: ['Frost Giants', 'Enchantress']
            }
        ],
        modularSets: [
            'The Black Order',
            'Armies of Titan',
            'Children of Thanos',
            'Infinity Gauntlet',
            'Legions of Hel',
            'Frost Giants',
            'Enchantress'
        ],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'sinister-motives',
        name: "Sinister Motives",
        type: ProductType.CAMPAIGN_BOX,
        releaseDate: '2022-04-08',
        heroes: [
            {
                id: 'sinister-motives-ghost-spider',
                name: 'Ghost-Spider',
                alterEgo: 'Gwen Stacy',
                nemesis: 'The Lizard',
                prebuiltAspects: [AspectType.PROTECTION]
            },
            {
                id: 'sinister-motives-spider-man',
                name: 'Spider-Man',
                alterEgo: 'Miles Morales',
                nemesis: "Prowler",
                prebuiltAspects: [AspectType.JUSTICE]
            }
        ],
        villains: [
            {
                name: 'Sandman',
                requiredSets: ['Sandman', 'City in Chaos'],
                recommendedSets: ['Down to Earth']
            },
            {
                name: 'Venom',
                requiredSets: ['Venom', 'Symbiotic Strength'],
                recommendedSets: ['Down to Earth']
            },
            {
                name: 'Mysterio',
                requiredSets: ['Mysterio', 'Personal Nightmare'],
                recommendedSets: ['Whispers of Paranoia']
            },
            {
                name: 'The Sinister Six',
                requiredSets: ['The Sinister Six', 'Guerilla Tactics'],
                recommendedSets: []
            },
            {
                name: 'Venom Goblin',
                requiredSets: ['Venom Goblin', 'Symbiotic Strength'],
                recommendedSets: ['Goblin Gear']
            }
        ],
        modularSets: [
            'City in Chaos',
            'Down to Earth',
            'Goblin Gear',
            'Guerilla Tactics',
            'Osborn Tech',
            'Personal Nightmare',
            'Sinister Assault',
            'Symbiotic Strength',
            'Whispers of Paranoia'
        ],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'mutant-genesis',
        name: "Mutant Genesis",
        type: ProductType.CAMPAIGN_BOX,
        releaseDate: '2022-09-30',
        heroes: [
            {
                id: 'mutant-genesis-colossus',
                name: 'Colossus',
                alterEgo: 'Piotr Rasputin',
                nemesis: 'Juggernaut',
                prebuiltAspects: [AspectType.PROTECTION]
            },
            {
                id: 'mutant-genesis-shadowcat',
                name: 'Shadowcat',
                alterEgo: 'Kitty Pryde',
                nemesis: "White Queen",
                prebuiltAspects: [AspectType.AGGRESSION]
            }
        ],
        villains: [
            {
                name: 'Sabretooth',
                requiredSets: ['Sabretooth'],
                recommendedSets: ['Mystique', 'Brotherhood']
            },
            {
                name: 'Project Wideawake',
                requiredSets: ['Project Wideawake', 'Zero Tolerance'],
                recommendedSets: ['Sentinels']
            },
            {
                name: 'Master Mold',
                requiredSets: ['Master Mold', 'Sentinels'],
                recommendedSets: ['Zero Tolerance']
            },
            {
                name: 'Mansion Attack',
                requiredSets: ['Mansion Attack', 'Brotherhood'],
                recommendedSets: ['Mystique']
            },
            {
                name: 'Magneto',
                requiredSets: ['Magneto'],
                recommendedSets: ['Acolytes']
            }
        ],
        modularSets: [
            'Mystique',
            'Brotherhood',
            'Zero Tolerance',
            'Sentinels',
            'Acolytes',
            'Future Past'
        ],
        standardSets: [],
        expertSets: [],
        aspects: []
    },
    {
        id: 'next-evolution',
        name: "NeXt Evolution",
        type: ProductType.CAMPAIGN_BOX,
        releaseDate: '2023-08-18',
        heroes: [
            {
                id: 'next-evolution-cable',
                name: 'Cable',
                alterEgo: 'Nathan Summers',
                nemesis: 'Stryfe',
                prebuiltAspects: [AspectType.LEADERSHIP]
            },
            {
                id: 'next-evolution-domino',
                name: 'Domino',
                alterEgo: 'Neena Thurman',
                nemesis: "Topaz",
                prebuiltAspects: [AspectType.JUSTICE]
            }
        ],
        villains: [
            {
                name: 'Morlock Siege',
                requiredSets: ['Marauders', 'Morlock Siege'],
                recommendedSets: ['Military Grade', 'Mutant Slayers']
            },
            {
                name: 'On The Run',
                requiredSets: ['Marauders', 'On The Run', 'Mutant Slayers'],
                recommendedSets: ['Military Grade', 'Nasty Boys']
            },
            {
                name: 'Juggernaut',
                requiredSets: ['Juggernaut', 'Hope Summers'],
                recommendedSets: ['Black Tom Cassidy']
            },
            {
                name: 'Mister Sinister',
                requiredSets: ['Mister Sinister', 'Flight', 'Super Strength', 'Telepathy', 'Hope Summers'],
                recommendedSets: ['Nasty Boys']
            },
            {
                name: 'Stryfe',
                requiredSets: ['Stryfe', 'Hope Summers'],
                recommendedSets: ['Extreme Measures', 'Mutant Insurrection']
            }
        ],
        modularSets: [
            'Military Grade',
            'Mutant Slayers',
            'Nasty Boys',
            'Hope Summers',
            'Black Tom Cassidy',
            'Flight',
            'Super Strength',
            'Telepathy',
            'Extreme Measures',
            'Mutant Insurrection'
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
                id: 'age-of-apocalypse-bishop',
                name: 'Bishop',
                alterEgo: 'Lucas Bishop',
                nemesis: 'Trevor Fitzroy',
                prebuiltAspects: [AspectType.LEADERSHIP]
            },
            {
                id: 'age-of-apocalypse-magik',
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
    },
    {
        id: 'agents-of-shield',
        name: 'Agents of S.H.I.E.L.D.',
        type: ProductType.CAMPAIGN_BOX,
        releaseDate: '2025-03-07',
        heroes: [
            {
                id: 'agents-of-shield-maria-hill',
                name: 'Maria Hill',
                alterEgo: 'Maria Hill',
                nemesis: 'Controller',
                prebuiltAspects: [AspectType.LEADERSHIP]
            },
            {
                id: 'agents-of-shield-nick-fury',
                name: 'Nick Fury',
                alterEgo: 'Nick Fury',
                nemesis: 'Orion',
                prebuiltAspects: [AspectType.JUSTICE]
            }
        ],
        villains: [
            {
                name: 'Black Widow',
                requiredSets: ['Black Widow'],
                recommendedSets: ['A.I.M. Abuction', 'A.I.M. Science']
            },
            {
                name: 'Batroc',
                requiredSets: ['Batroc'],
                recommendedSets: ['A.I.M. Science', "Batroc's Brigade"]
            },
            {
                name: 'M.O.D.O.K.',
                requiredSets: ['M.O.D.O.K.'],
                recommendedSets: ['Scientist Supreme']
            },
            {
                name: 'Thunderbolts',
                requiredSets: ['Thunderbolts'],
                recommendedSets: [
                    'Gravitational Pull',
                    'Hard Sound',
                    'Pale Little Spider',
                    'Power of the Atom',
                    'Supersonic',
                    'The Leaper'
                ]
            },
            {
                name: 'Baron Zemo',
                requiredSets: ['Baron Zemo', 'S.H.I.E.L.D. Executive Board', 'Executive Board Evidence'],
                recommendedSets: ['Scientist Supreme', 'S.H.I.E.L.D.']
            }
        ],
        modularSets: [
            'A.I.M. Abuction',
            'A.I.M. Science',
            "Batroc's Brigade",
            'Scientist Supreme',
            'S.H.I.E.L.D.',
            'S.H.I.E.L.D. Executive Board',
            'Gravitational Pull',
            'Hard Sound',
            'Pale Little Spider',
            'Power of the Atom',
            'Supersonic',
            'The Leaper'
        ],
        standardSets: [],
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

    // Add aspects from products
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
export function getHeroById(heroId: string): { hero: Hero } | undefined {
    for (const product of products) {
        const hero = product.heroes.find(h => h.id === heroId);
        if (hero) {
            return {
                hero
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