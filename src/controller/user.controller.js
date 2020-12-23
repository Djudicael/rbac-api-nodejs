import { render } from "ejs";

export const profile = async (req, res, next) => {

    try {
       res.render('profile');

    } catch (err) {

        next(err);
    }
};