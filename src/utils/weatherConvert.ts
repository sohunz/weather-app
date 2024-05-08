export const weatherConvert = (temp?: number) => {
    if (temp) {
        const celsius = temp - 273.15;
        return celsius.toFixed(0);
    }
    return "";
};
