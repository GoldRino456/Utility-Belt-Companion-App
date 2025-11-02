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

export enum StandardSet {
    STANDARD = 'Standard',
    STANDARD_II = 'Standard II',
    STANDARD_III = 'Standard III',
    NONE = 'None'
}

export enum ExpertSet {
    EXPERT = 'Expert',
    EXPERT_II = 'Expert II',
    NONE = 'None'
}

export enum GameResult {
    VICTORY = 'Victory',
    DEFEAT = 'Defeat'
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
    name: string;
    alterEgo: string;
    nemesis: string;
    prebuiltAspects?: AspectType[];
}

export interface Villain {
    name: string;
    requiredSets?: string[];
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
    owned: boolean;
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
    aspect: AspectType;
    nemesisEncountered: boolean;
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
// STATISTICS TYPES
// ============================================================================

export interface GameStatistics {
    totalGames: number;
    totalVictories: number;
    totalDefeats: number;
    winRate: number;
    currentStreak: number;
    isWinStreak: boolean;
    totalNemesisEncounters: number;
    lastPlayedDate?: string;
}

export interface HeroStats {
    hero: Hero;
    gamesPlayed: number;
    victories: number;
    defeats: number;
    winRate: number;
}

export interface AspectStats {
    aspect: AspectType;
    gamesPlayed: number;
    victories: number;
    defeats: number;
    winRate: number;
}

export interface VillainStats {
    villain: Villain;
    timesFaced: number;
    victories: number;
    defeats: number;
    winRate: number;
}

export interface NemesisStats {
    hero: Hero;
    totalEncounters: number;
    encounterRate: number; 
    winsWithNemesis: number;
    winsWithoutNemesis: number;
    winRateWithNemesis: number;
    winRateWithoutNemesis: number;
}

export interface DifficultyStats {
    standardSet: StandardSet;
    expertSet: ExpertSet;
    gamesPlayed: number;
    victories: number;
    winRate: number;
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
        aspect: AspectType;
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

// ============================================================================
// FILTER TYPES (for UI components)
// ============================================================================

export interface GameLogFilters {
    hero?: Hero;
    villain?: Villain;
    aspect?: AspectType;
    result?: GameResult;
    dateFrom?: string;
    dateTo?: string;
    standardSet?: StandardSet;
    expertSet?: ExpertSet;
    nemesisEncountered?: boolean;
}

export interface ProductFilters {
    type?: ProductType;
    owned?: boolean;
    searchTerm?: string;
}

// ============================================================================
// CONTEXT TYPES (for React Context)
// ============================================================================

export interface AppContextType {
    // Collection
    collection: CollectionItem[];
    ownedProducts: Product[];
    updateCollection: (items: CollectionItem[]) => Promise<void>;
    toggleProductOwnership: (productId: string) => Promise<void>;

    // Games
    games: GameLog[];
    addGame: (game: Omit<GameLog, 'id'>) => Promise<void>;
    updateGame: (id: string, game: Partial<GameLog>) => Promise<void>;
    deleteGame: (id: string) => Promise<void>;

    // Achievements
    achievements: Achievement[];
    updateAchievement: (id: string, updates: Partial<Achievement>) => Promise<void>;
    checkAchievements: () => Promise<void>;

    // Settings
    settings: AppSettings;
    updateSettings: (settings: Partial<AppSettings>) => Promise<void>;

    // Data management
    exportData: () => Promise<ExportData>;
    importData: (data: ExportData, mode: 'merge' | 'replace') => Promise<void>;
    clearAllData: () => Promise<void>;

    // Loading state
    isLoading: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
    key: keyof T;
    direction: SortDirection;
}