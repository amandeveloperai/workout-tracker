export const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
};

export const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.split('T')[0] === date2.split('T')[0];
};

export const isYesterday = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(dateString, yesterday.toISOString());
};
