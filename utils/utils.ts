export const nl2br = (string: string): string => {
    return string?.replace(/\r?\n/g, "<br>");
};
