import express from 'express';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
}))
app.use(express.urlencoded({extended:true})); 



/**
 * Routes
 */


app.use('/api/auth',authRouter);
 

export default app;