import { Villain } from '../../types';

export interface GeneratorModule {
    generateScenario: (villain: Villain, numPlayers: number) => GeneratorModuleReturn;
}

export interface GeneratorModuleReturn {
    requiredSets: string[];
    recommendedSets: string[];
}

export { MojoManiaModule } from '../generatorModules/mojoManiaModule';