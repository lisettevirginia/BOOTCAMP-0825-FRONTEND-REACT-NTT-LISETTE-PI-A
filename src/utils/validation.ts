export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 3;
};

export const validateNoSpaces = (value: string): boolean => {
    return !value.includes(' ');
};

export const validateMinLength = (value: string, min: number): boolean => {
    return value.length >= min;
}