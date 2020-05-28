const router = require('express').Router();

let User = require('../../models/User');

router.route('/userupdate').post((req, res) => {
    const { body } = req;
    const { params } = body;
    const {
        UserId,
        UserPw
    } = params;

    console.log(req)

    if(!UserPw) {
        res.send({
            success: false,
            message: 'UserPw cannot blank : UserUpdate'
        })
    }
    
    const user = new User();

    User.update({ UserId: UserId }, { $set: { UserPw: user.generateHash(UserPw) } }, (err, updaetUser) => {
        if(err) {
            res.send({
                success: false,
                message: 'Password cannot update (update)'
            })
        } else {
            res.send({
                success: true,
                message: 'Password is update successfully.'
            })
        }
    })
        
})

module.exports = router;