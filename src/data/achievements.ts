import { Achievement, AchievementCategory, AchievementRequirement } from '../types';

export const achievements: Achievement[] = [
    {
        id: "placeholder-id",
        title: "Placeholder Achievement",
        description: "This holds the place of real achievements!",
        category: AchievementCategory.GENERAL,
        isAutoTracked: false,
        requirement: {
            type: 'games_won',
            count: 5
        },
        progress: 10,
        isCompleted: false
    }
];