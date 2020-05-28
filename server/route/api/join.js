const router = require('express').Router();

let User = require('../../models/User');

router.route('/join').post((req, res, next) => {
    console.log(req, 'req');
    const { body } = req;
    const {
        UserId,
        UserPw,
        UserName,
    } = body;
    console.log(body, 'body')

    if(!UserId) {
        return res.send({
            success: false
        })
    }
    if(!UserPw) {
        return res.send({
            success: false
        })
    }
    if(!UserName) {
        return res.send({
            success: false
        })
    }

    User.find({
        UserId: UserId
    }, (err, previousUsers) => {
        if(err) {
            return res.send({
                success: false,
                message: 'Error: Server error(join)'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account aleady exist'
            });
        }

        const newUser = new User();

        newUser.UserId = UserId;
        newUser.UserPw = newUser.generateHash(UserPw);
        newUser.UserName = UserName;
        newUser.save((err, user) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error(new)'
                })
            }
            return res.send({
                success: true,
                message: 'Signed up (new)'
            })
        })
    })
})

module.exports = router;