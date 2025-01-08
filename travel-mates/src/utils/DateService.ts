export function formatDate(date: Date): string {
    const today = new Date();

    // Comparaison des dates sans l'heure
    const isSameDate =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    if (isSameDate) {
        // Affiche l'heure et les minutes si c'est aujourd'hui
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        // Sinon affiche la date complète
        return date.toLocaleDateString();
    }
}

export function formatApiDate(date: string | Date): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    const today = new Date();

    // Comparaison des dates sans l'heure
    const isSameDate =
        parsedDate.getDate() === today.getDate() &&
        parsedDate.getMonth() === today.getMonth() &&
        parsedDate.getFullYear() === today.getFullYear();

    if (isSameDate) {
        // Affiche l'heure et les minutes si c'est aujourd'hui
        return parsedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        // Sinon affiche la date complète
        return parsedDate.toLocaleDateString();
    }
}

export function convertDateToISO(date: string): string {
    const [day, month, year] = date.split('/');
    return new Date(`${year}-${month}-${day}`).toISOString();
}
