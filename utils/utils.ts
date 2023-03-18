export const nl2br = (string: string): string => {
    return string?.replace(/\r?\n/g, "<br>");
};

export const blobToDataURL = (blob: Blob): Promise<any> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
