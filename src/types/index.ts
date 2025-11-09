export { GetColorMapForAspect } from '../types/colorMaps';

// ============================================================================
// ENUMS
// ============================================================================

export enum ProductType {
    CORE_SET = 'Core Set',
    HERO_PACK = 'Hero Pack',
    SCENARIO_PACK = 'Scenario Pack',
    CAMPAIGN_BOX = 'Campaign Box'
}

export enum AspectType {
    AGGRESSION = 'Aggression',
    JUSTICE = 'Justice',
    LEADERSHIP = 'Leadership',
    PROTECTION = 'Protection',
    POOL = "'Pool",
    BASIC = 'Basic'
}

export enum AspectColorClasses {
    AGGRESSION = 'bg-red-100 text-red-700',
    JUSTICE = 'bg-yellow-100 text-yellow-700',
    LEADERSHIP = 'bg-sky-100 text-sky-700',
    PROTECTION = 'bg-green-100 text-green-700',
    POOL = "bg-pink-100 text-pink-700",
    BASIC = 'bg-slate-100 text-slate-700'
}

export enum StandardSet {
    STANDARD = 'Standard',
    STANDARD_II = 'Standard II',
    STANDARD_III = 'Standard III',
    RANDOM = 'Random Standard Set'
}

export enum ExpertSet {
    EXPERT = 'Expert',
    EXPERT_II = 'Expert II',
    NONE = 'None'
}

export enum GameResult {
    VICTORY = 'Victory',
    DEFEAT = 'Defeat',
    IN_PROGRESS = 'In-Progress'
}

export enum AchievementCategory {
    GAMES_PLAYED = 'Games Played',
    VILLAIN_DEFEATS = 'Villain Defeats',
    HERO_VICTORIES = 'Hero Victories',
    NEMESIS = 'Nemesis',
    DIFFICULTY = 'Difficulty',
    COLLECTION = 'Collection',
    GENERAL = 'General'
}

// ============================================================================
// PRODUCT & COLLECTION TYPES
// ============================================================================

export interface Hero {
    id: string;
    name: string;
    alterEgo: string;
    nemesis: string;
    prebuiltAspects?: AspectType[];
}

export interface Villain {
    name: string;
    requiredSets: string[];
    recommendedSets?: string[];
}

export interface Product {
    id: string;
    name: string;
    type: ProductType;
    releaseDate: string;
    heroes: Hero[];
    villains: Villain[];
    modularSets: string[];
    standardSets: StandardSet[];
    expertSets: ExpertSet[];
    aspects: AspectType[];
}

export interface CollectionItem {
    productId: string;
}

// ============================================================================
// GAME LOG TYPES
// ============================================================================

export interface DifficultyConfig {
    standardSet: StandardSet;
    expertSet: ExpertSet;
}

export interface Player {
    playerName?: string;
    hero: Hero;
    aspects: AspectType[];
    nemesisEncountered?: boolean;
}

export interface GameLog {
    id: string;
    dateTime: string;
    players: Player[];
    villain: Villain;
    difficulty: DifficultyConfig;
    requiredSets: string[];
    additionalSets: string[];
    result: GameResult;
    notes?: string;
}

// ============================================================================
// ACHIEVEMENT TYPES
// ============================================================================

export type AchievementRequirement =
    | { type: 'games_won'; count: number }
    | { type: 'games_played'; count: number }
    | { type: 'villain_defeat'; villain: Villain; count: number }
    | { type: 'nemesis_total'; count: number }
    | { type: 'difficulty_config'; difficulty: DifficultyConfig }
    | { type: 'win_streak'; count: number };

export interface Achievement {
    id: string;
    title: string;
    description: string;
    category: AchievementCategory;
    isAutoTracked: boolean;
    requirement: AchievementRequirement;
    progress: number;
    isCompleted: boolean;
    completedDate?: string;
}

// ============================================================================
// RANDOM GENERATOR TYPES
// ============================================================================

export interface GeneratorConfig {
    playerCount: number;
    difficulty: DifficultyConfig;
    additionalSetCount: number;
    matchEncounterSetNumber: boolean;
    randomizeHeroes: boolean;
    randomizeAspects: boolean;
    excludeRecentlyPlayed: boolean;
    excludeCount: number; // Last N games to exclude
}

export interface GeneratedScenario {
    villain: Villain;
    difficulty: DifficultyConfig;
    requiredSets: string[];
    additionalSets: string[];
    players?: Array<{
        hero: Hero;
        aspects: AspectType[];
    }>;
}

// ============================================================================
// SETTINGS & EXPORT TYPES
// ============================================================================

export interface AppSettings {
    defaultDifficulty: DifficultyConfig;
    theme?: 'light' | 'dark';
}

export interface ExportData {
    version: string;
    exportDate: string;
    collection: CollectionItem[];
    games: GameLog[];
    achievements: Achievement[];
    settings: AppSettings;
}