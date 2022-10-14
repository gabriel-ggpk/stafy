import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/games.js';
import router2 from './routes/category.js';
dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());
server.use(router);
server.use(router2);


server.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
})
