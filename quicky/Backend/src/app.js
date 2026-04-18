import express from 'express';
import authRouter from './routes/auth.route.js';
import productRouter from './routes/product.routes.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors'
import { config } from './config/config.js';
import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'




const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin:"http://localhost:5173",
//     methods:["GET","POST","DELETE","PUT"],
//     credentials:true,
// }))
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL:'/api/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
 
    return done(null,profile)
}
))



/**
 * Routes Authentication
 */


app.use('/api/auth',authRouter);

/**
 * Routes Product
 */
app.use('/api/products', productRouter);

export default app;