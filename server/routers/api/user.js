import express from 'express';

const router = express.Router();

import User from '../../models/user';
import validatorUser from '../../shared/validations/signup';


router.get('/', (req, res) => {
    User.find().exec((e, d) => {
        res.json(d);
    })
});

router.post('/', (req, res) => {
    const error = validatorUser(req.body);
    if(!error.isValid) {
        return res.json(error);
    }
    User.findOne({
        $or: [{
            email: req.body.email
        }, {
            username: req.body.username
        }]
    }, (err, user) => {
        if(user){
            error.isValid = false;
            if(user.username == req.body.username){
                error.errors = {
                    username: 'Username has been used'
                }
            }
            if(user.email == req.body.email){
                error.errors = {
                    email: 'Email has been used'
                }
            }
            return res.json(error)
        }
        var newUser = new User();
        newUser.email = req.body.email;
        newUser.username = req.body.username;
        newUser.password = newUser.hashPassword(req.body.password);
        newUser.save(function(err, nUser){
            return res.json({
                isValid: true,
                success: true,
                message: 'Signup successfully!'
            });
        })
    });
});


export default router;