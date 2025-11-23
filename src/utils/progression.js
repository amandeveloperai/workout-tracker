export const getNextWeight = (exerciseName, history) => {
    // Find the last time this exercise was performed
    const lastWorkout = history.find(w =>
        w.exercises.some(e => e.name === exerciseName)
    );

    if (!lastWorkout) return null;

    const lastExercise = lastWorkout.exercises.find(e => e.name === exerciseName);
    if (!lastExercise || !lastExercise.sets.length) return null;

    // Simple progression: Find max weight used and add 2.5kg
    const maxWeight = Math.max(...lastExercise.sets.map(s => s.weight || 0));

    return maxWeight > 0 ? maxWeight + 2.5 : null;
};
