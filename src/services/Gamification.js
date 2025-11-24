import { getTodayDate, isYesterday, isSameDay } from '../utils/dateUtils';

export const BADGES = [
    { id: 'first_workout', name: 'Spartan Initiate', description: 'Complete your first workout', icon: '🛡️' },
    { id: 'streak_3', name: 'Hermes Speed', description: 'Maintain a 3-day streak', icon: '⚡' },
    { id: 'streak_7', name: 'Hercules Strength', description: 'Maintain a 7-day streak', icon: '🦁' },
    { id: 'streak_30', name: 'Titan Endurance', description: 'Maintain a 30-day streak', icon: '🗿' },
    { id: 'heavy_lifter', name: 'Atlas Bearer', description: 'Lift over 100kg in any exercise', icon: '🌍' },
    { id: 'level_5', name: 'Olympian', description: 'Reach Level 5', icon: '⚡' }
];

export const calculateStreak = (lastWorkoutDate, currentStreak) => {
    const today = getTodayDate();

    if (!lastWorkoutDate) return 1; // First workout ever
    if (isSameDay(lastWorkoutDate, today)) return currentStreak; // Already worked out today
    if (isYesterday(lastWorkoutDate)) return currentStreak + 1; // Worked out yesterday, streak continues

    return 1; // Streak broken, reset to 1 (for today's workout)
};

export const calculateXP = (workout) => {
    let xp = 50; // Base XP for showing up

    // XP for sets
    workout.exercises.forEach(ex => {
        xp += (ex.sets || 0) * 10;
    });

    return xp;
};

export const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1;
};

export const checkNewBadges = (user, workout) => {
    const newBadges = [];
    const existingBadges = new Set(user.badges);

    // Badge: First Workout
    if (!existingBadges.has('first_workout')) {
        newBadges.push('first_workout');
    }

    // Badge: Streak 3
    if (user.streak >= 3 && !existingBadges.has('streak_3')) {
        newBadges.push('streak_3');
    }

    // Badge: Streak 7
    if (user.streak >= 7 && !existingBadges.has('streak_7')) {
        newBadges.push('streak_7');
    }

    // Badge: Streak 30
    if (user.streak >= 30 && !existingBadges.has('streak_30')) {
        newBadges.push('streak_30');
    }

    // Badge: Level 5
    if (user.level >= 5 && !existingBadges.has('level_5')) {
        newBadges.push('level_5');
    }

    return newBadges;
};
