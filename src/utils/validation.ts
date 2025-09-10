//validaciones de formularios
export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 3;// validando que el password tenga mínimo 3 caracteres.
};

export const validateNoSpaces = (value: string): boolean => {
    return !value.includes(' ');
};

export const validateMinLength = (value: string, min: number): boolean => {
    return value.length >= min;
}