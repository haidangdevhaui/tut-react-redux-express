import passport from 'passport';
import User from '../models/user';

export default function () {

    // Use Passport's 'serializeUser' method to serialize the user id
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // Use Passport's 'deserializeUser' method to load the user document
    passport.deserializeUser(function (id, done) {
        /* member.findOne({
            _id: id
        }, '-password -salt', function (err, user) {
            done(err, user);
        });
        * */
        User.findById(id , function (err, user) {
            done(err, user);
        });
    });

    // Load Passport's strategies configuration files
    //require('./passport/local.js')();
    //require('./strategies/twitter.js')();
    //require('./strategies/facebook.js')();
    //require('./strategies/google.js')();
};