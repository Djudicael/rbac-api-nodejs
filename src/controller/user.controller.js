export const profile = async (req, res, next) => {

    try {
        res.send('User profile');

    } catch (err) {

        next(err);
    }
};