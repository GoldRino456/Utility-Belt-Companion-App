import { GeneratorModule, GeneratorModuleReturn } from '../generatorModules';
import { getProductById } from '../products';

export const MojoManiaModule: GeneratorModule = {

    generateScenario(villain, numPlayers): GeneratorModuleReturn {

        let mojoManiaSets = getProductById('cycle6-mojo-mania')?.modularSets ?? [];

        let scenarioValues: GeneratorModuleReturn = {
            requiredSets: [],
            recommendedSets: []
        };

        if (mojoManiaSets === undefined || mojoManiaSets.length <= 0) {
            console.log("Error loading Mojo Mania modular sets in generator module. Var is undefined.");
            return scenarioValues;
        }

        const generateMagogScenario = () => {
            scenarioValues.requiredSets = villain.requiredSets;
            scenarioValues.recommendedSets = getNumRandomMojoSets(1);
        };

        const generateSpiralScenario = () => {
            scenarioValues.requiredSets = [...villain.requiredSets, ...getNumRandomMojoSets(3)];
        };

        const generateMojoScenario = () => {
            scenarioValues.requiredSets = [...villain.requiredSets, ...getNumRandomMojoSets(1 + numPlayers)];
        };

        const getNumRandomMojoSets = (numSets: number): string[] => {
            let sets: string[] = [];

            for (let i = 0; i < numSets; i++) {
                const randSet = mojoManiaSets[Math.floor(Math.random() * mojoManiaSets.length)];

                // +1 Set if Longshot is rolled
                if (randSet === 'Longshot') {
                    numSets++;
                }

                sets = [...sets, randSet];
                mojoManiaSets = mojoManiaSets.filter(s => s !== randSet);
            }

            return sets;
        }

        switch (villain.name) {
            case 'MaGog':
                generateMagogScenario();
                break;

            case 'Spiral':
                generateSpiralScenario();
                break;

            case 'Mojo':
                generateMojoScenario();
                break;
        }

        return scenarioValues;
    }

};