import User from '../../models/user';
import validatorUser from '../../shared/validations/signup';

export default (api) => {

    api.get('/user', (req, res) => {
        User.find().exec((e, d) => {
            res.json(d);
        })
    });

    api.post('/user', (req, res) => {
        const error = validatorUser(req.body);
        if(!error.isValid) {
            return res.json(error);
        }
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            // if(user){
            //     error.isValid = false;
            //     error.errors = {
            //         email: 'Email has been used'
            //     }
            //     return res.json(error)
            // }
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
}