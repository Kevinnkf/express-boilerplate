import dotenv from 'dotenv';
import db from './models/index.js';
import routes from './routes/index.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const port = 3005;
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Welcome to my portofolio!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
    
    console.log(`ENV is working: ${process.env.DB_NAME}`);

});