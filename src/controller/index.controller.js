export const root = async (req, res, next) => {

    try {
        res.send('hello world');

    } catch (err) {

        next(err);
    }
};