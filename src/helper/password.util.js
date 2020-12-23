import argon2 from 'argon2';

export const encryptPassword = async (password) => {
    return await argon2.hash(password);
}


export const isValidPassword = async (password, hashedPassword) => {

    const correctPassword = await argon2.verify(hashedPassword, password);
    return correctPassword;
}