import app from './src/app.js';
import http from 'http';
import { PORT } from './src/config/config.js';

const port = PORT || 3001;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});