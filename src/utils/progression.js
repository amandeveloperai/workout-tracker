export const getNextWeight = (exerciseName, history) => {
    // Filter history for this exercise
    const exerciseHistory = history
        .filter(w => w.exercises.some(e => e.name === exerciseName))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3); // Last 3 sessions

    if (!exerciseHistory.length) return null;

    const lastSession = exerciseHistory[0].exercises.find(e => e.name === exerciseName);
    if (!lastSession || !lastSession.sets || !lastSession.sets.length) return null;

    const maxWeight = Math.max(...lastSession.sets.map(s => Number(s.weight) || 0));

    // Intelligent Logic:
    // If they performed well (>= 10 reps on top sets), suggest increase.
    const strongSets = lastSession.sets.filter(s => Number(s.weight) === maxWeight && Number(s.reps) >= 8);

    if (strongSets.length >= 2) {
        return maxWeight + 2.5; // Progressive Overload
    }

    return maxWeight; // Maintenance
};
