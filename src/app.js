import express from 'express';
import morgan from 'morgan';
import createError from 'http-errors';

import IndexRouter from './routes/index.route.js';
import AuthRouter from './routes/auth.route.js';
import UserRouter from './routes/user.route.js';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', IndexRouter);
app.use('/auth', AuthRouter);
app.use('/user', UserRouter);

app.use(async (req, res, next) => {
    next(createError.NotFound());
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

export default app;