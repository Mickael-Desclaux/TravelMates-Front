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