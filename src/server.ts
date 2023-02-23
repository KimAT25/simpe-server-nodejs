import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router';
import { protect } from './modules/auth';

import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {    
    res.status(200);
    res.json({ message: 'Hello Express'});
})

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized'});
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input'});
    } else {
        res.status(500).json({ message: 'Opps error happen on server...!!'});
    }
})

process.on('uncaughtException', (error) => {
    console.error('uncaughtException' + error);
})

process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection' + error);
})

export default app;
