import * as userService from '../service/user.service.js';
export const login = async (req, res, next) => {

    try {
        res.render('login');

    } catch (err) {

        next(err);
    }
};

export const loginPost = async (req, res, next) => {

    try {
        res.send(req.body);

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
        console.log(req.body)
        const { email, password, password2}=req.body;
        const createdUser= await userService.registerPost({email,password});
        res.send(createdUser);

    } catch (err) {

        next(err);
    }
};

export const logout = async (req, res, next) => {

    try {
        res.send('logout');

    } catch (err) {

        next(err);
    }
};