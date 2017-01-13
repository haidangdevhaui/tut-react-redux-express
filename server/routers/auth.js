import express from 'express';
import jwt from 'jsonwebtoken';
import apiConfig from '../config/api';
import User from '../models/user';
import passport from 'passport';
import Local from 'passport-local';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new Local.Strategy({
    usernameField: 'email',
    passwordField: 'password'
},function (email, password, done) {
    User
        .findOne({
            email: email
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Tên đăng nhập không hợp lệ!'});
            }
            if (!user.authenticate(password)) {
                return done(null, false, {message: 'Mật khẩu không đúng!'});
            }
            return done(null, user);
        });
}));

router.post('/', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({
                error: true,
                message: info.message
            });
        }
        req
            .logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                const token = jwt.sign(user, apiConfig.jwtSecrect);
                res.json({token});
            });
    })(req, res, next);
    
});

router.post('/profile', authenticate, (req, res) => {
    
    return res.json({
        error: false,
        message: 'ok'
    });
});

router.get('/check', (req, res) => {
    if(req.isAuthenticated()){
        return res.json(true);
    }
    return res.json(false);
})

router.get('/logout', (req, res) => {
    if(req.isAuthenticated()){
        req.logOut();
        return res.json(true);
    }
    return res.json(false);
})

export default router;