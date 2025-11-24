export const EXERCISE_CATEGORIES = {
    STRENGTH: 'Strength',
    CALISTHENICS: 'Calisthenics',
    YOGA: 'Yoga',
    CARDIO: 'Cardio',
    FLEXIBILITY: 'Flexibility'
};

export const DEFAULT_EXERCISES = [
    // Strength (Barbell/Dumbbell/Machine)
    'Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Barbell Row',
    'Dumbbell Press', 'Dumbbell Lunges', 'Leg Press', 'Lat Pulldown',
    'Bicep Curl', 'Tricep Extension', 'Face Pull', 'Lateral Raise',

    // Calisthenics (Bodyweight)
    'Push Up', 'Pull Up', 'Dip', 'Chin Up', 'Muscle Up',
    'Air Squat', 'Pistol Squat', 'L-Sit', 'Plank', 'Burpee',
    'Handstand Push Up', 'Box Jump',

    // Yoga
    'Downward Dog', 'Upward Dog', 'Warrior I', 'Warrior II', 'Tree Pose',
    'Crow Pose', 'Child\'s Pose', 'Sun Salutation A', 'Sun Salutation B',
    'Corpse Pose (Savasana)',

    // Cardio
    'Running', 'Cycling', 'Jump Rope', 'Rowing Machine', 'Elliptical',
    'Swimming', 'Sprinting', 'HIIT',

    // Flexibility/Mobility
    'Foam Rolling', 'Hamstring Stretch', 'Hip Flexor Stretch', 'Shoulder Dislocates'
];

export const getCategory = (exerciseName) => {
    // Simple helper to guess category (could be more robust)
    if (['Running', 'Cycling', 'Swimming'].includes(exerciseName)) return EXERCISE_CATEGORIES.CARDIO;
    if (['Yoga', 'Pose', 'Salutation'].some(k => exerciseName.includes(k))) return EXERCISE_CATEGORIES.YOGA;
    if (['Push Up', 'Pull Up', 'Dip', 'Plank'].includes(exerciseName)) return EXERCISE_CATEGORIES.CALISTHENICS;
    return EXERCISE_CATEGORIES.STRENGTH;
};
