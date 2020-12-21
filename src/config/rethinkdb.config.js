import rethinkdb from 'rethinkdb';
import { DB, DB_HOST, DB_PORT } from './config.js'

export const getConnection = async () => {
    return await rethinkdb.connect({
        host: DB_HOST,
        port: DB_PORT,
        db: DB
    });
};
