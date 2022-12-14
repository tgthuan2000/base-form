/**
 * replace date if it is string and have right format
 * @param date date check if it is string
 * date.match(/^\d{4}-\d{2}-\d{2}$/) regex for yyyy-MM-dd
 * date.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) regex for yyyy-MM-dd HH:ii:ss
 * @returns {string}
 */
export const getDateWithFormat = (date) => {
    if (typeof date === "string")
        if (
            date.match(/^\d{4}-\d{2}-\d{2}$/) ||
            date.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
        ) {
            return new Date(date.replaceAll("-", "/"));
        }

    return date;
};
