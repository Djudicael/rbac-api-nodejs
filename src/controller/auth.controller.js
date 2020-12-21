export const login = async (req, res, next) => {

    try {
        res.send('login');

    } catch (err) {

        next(err);
    }
};
export const loginPost = async (req, res, next) => {

    try {
        res.send('login post');

    } catch (err) {

        next(err);
    }
};

export const register = async (req, res, next) => {

    try {
        res.send('register');

    } catch (err) {

        next(err);
    }
};
export const registerPost = async (req, res, next) => {

    try {
        res.send('register post');

    } catch (err) {

        next(err);
    }
};