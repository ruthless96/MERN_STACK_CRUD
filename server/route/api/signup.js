const router = require('express').Router();

let User = require('../../models/User');
let UserSession = require('../../models/UserSession');

router.route('/signup').post((req, res) => {

    console.log(req, 'req')
    

    const { body } = req;
    console.log(body, 'body')
    const { params } = body;


    const {
        UserId,
        UserPw,
        UserName
    } = params;

    if(!UserId) {
        return res.send({
            success: false,
            message: 'Error : ID cannot blank (signup)'
        })
    }

    if(!UserPw) {
        return res.send({
            success: false,
            message: 'Error : Password cannot blank (signup)'
        })
    }

    if(!UserName) {
        return res.send({
            success: false,
            message: 'Error : Name cannot blank (signup)'
        })
    }

    User.find({
        UserId: UserId
    }, (err, alreadyUser) => {
        if(err) {
            return res.send({
                success: false,
                message: 'Error: Server error (signup)'
            })
        }

        if(alreadyUser.legnth > 0) {
            return res.send({
                success: false,
                message: 'Error: ID already exist (signup)'
            })
        }
    })

    const newUser = new User();

    newUser.UserId = UserId;
    newUser.UserPw = newUser.generateHash(UserPw);
    newUser.UserName = UserName;

    newUser.save((err, user) => {
        if(err) {
            return res.send({
                success: false,
                message: 'Error: Server error (signup)'
            })
        }

        return res.send({
            success: true,
            message: 'Create User!'
        })
    })


})

module.exports = router;